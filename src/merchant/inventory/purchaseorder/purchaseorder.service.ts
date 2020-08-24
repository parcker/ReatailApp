import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import {CreatePurchaseOrderDto, ApprovePurchaseOrderDto } from '../../../app-Dto/merchant/purcahseorder.dto';
import { Business, BusinessLocation } from '../../../entities/business.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiResponseService } from '../../../shared/response/apiResponse.service';
import { PayloadvalidationService } from '../../../shared/payloadvalidation/payloadvalidation.service';
import { PurchaseOrder, OrderItem } from '../../../entities/order.entity';
import { Repository } from 'typeorm';
import { Supplier } from '../../../entities/partner.entity';
import { v4 as uuidv4 } from 'uuid';

import { SettingsService } from '../../settings/settings.service';
import {TransactionStatusEnum, DocType, PurchaseSearchType } from '../../../enums/settings.enum';
import { Product } from '../../../entities/product.entity';
import { SearchParametersDto } from '../../../app-Dto/merchant/searchparameters.dto';
import { Warehouse } from '../../../entities/warehouse.entity';

@Injectable()
export class PurchaseorderService {
   
  
   constructor(@InjectRepository(PurchaseOrder) private readonly purchaseOrderRepository: Repository<PurchaseOrder>,
      @InjectRepository(Supplier) private readonly supplierRepository: Repository<Supplier>,
      @InjectRepository(Product) private readonly productRepository: Repository<Product>,
      @InjectRepository(OrderItem) private readonly purchaseitemRepository: Repository<OrderItem>,
      @InjectRepository(BusinessLocation) private readonly businesslocationRepository: Repository<BusinessLocation>,
      @InjectRepository(Warehouse) private readonly warehouseRepository: Repository<Warehouse>,
      private readonly payloadService: PayloadvalidationService,
      private readonly apiResponseService: ApiResponseService,
      private readonly settingService: SettingsService
   ) {

   }
   async creatPurchaseHeader(model: CreatePurchaseOrderDto, business: Business, createdby: string, purchaseorderlocationId: string): Promise<any> {
      try {

         let validationResult = await this.payloadService.validatePurchaseOrderHeaderAsync(model);
         if (validationResult.IsValid) 
         {
            let supplierinfo = await this.supplierRepository.findOne({ where: { id: model.supplierId, business: business, isDisabled: false } });
            if (!supplierinfo) {

               return this.apiResponseService.FailedBadRequestResponse(
                  `invalid or supplier Id , no supplier data found`,
                  HttpStatus.BAD_REQUEST, '');
            }
           
            let businesslocation = await this.businesslocationRepository.findOne({ where: { business: business, id: model.shiptobusinessId } });
            if (!businesslocation) {

               return this.apiResponseService.FailedBadRequestResponse(
                  `invalid or shipment location Id , no shipment location data found`,
                  HttpStatus.BAD_REQUEST, '');
            }
            let warehouse = await this.warehouseRepository.findOne({ where:{id: model.warehouseId,isDisabled:false}});
            if (!warehouse) {

               return this.apiResponseService.FailedBadRequestResponse(
                  `invalid warehouse Id , no warehouse data found`,
                  HttpStatus.BAD_REQUEST, '');
            }

            if(model.invoiceNumber.length>0){

               console.log('Checking invoice');
               const duplicatecheck=await this.purchaseOrderRepository.findOne({where:{inputedinvoiceNumber:model.invoiceNumber}});
               if(duplicatecheck){

                  return this.apiResponseService.FailedBadRequestResponse(
                     `duplicate invoice number detected , please double check invoice number`,
                     HttpStatus.BAD_REQUEST, '');
               }
            }
           
            let purchaseorder = new PurchaseOrder();
            purchaseorder.fiscalyear = null;
            purchaseorder.invoiceNumber=uuidv4();
            purchaseorder.transactionstatusId = TransactionStatusEnum.Created;
            var type: TransactionStatusEnum =  purchaseorder.transactionstatusId;
            purchaseorder.transactionstatus=TransactionStatusEnum[type]
            purchaseorder.raisedlocation = await this.businesslocationRepository.findOne({ where: { business: business, id: purchaseorderlocationId } });
            purchaseorder.doctypeId = DocType.PurchaseOrder;
            purchaseorder.isDisabled = false;
            purchaseorder.supplier=supplierinfo;
            purchaseorder.business = business;
            purchaseorder.createdby = createdby;
            purchaseorder.updatedby = '';
            purchaseorder.shipbusinesslocation = businesslocation;
            purchaseorder.dueDate = model.duedate;
            purchaseorder.inputedinvoiceNumber = model.invoiceNumber;
            purchaseorder.warehouse=warehouse;
            let response = await this.purchaseOrderRepository.save(purchaseorder);
            if(response){
              
               const itemResponse=this.postpurchaseitem(model,createdby,purchaseorder);
               return this.apiResponseService.SuccessResponse(
                  `Purshase order has been created and activated`,
                  HttpStatus.OK, response);
            }
      
         }
         return await this.payloadService.badRequestErrorMessage(validationResult);
      }
      catch (error) {
         console.error('creatPurchaseHeader Error:',error.message);
         Logger.error(error);
         return new HttpException({
            message: 'Process error while executing operation:',
            code: 500, status: false
         },
            HttpStatus.INTERNAL_SERVER_ERROR);
      }
   }
   async postpurchaseitem(model:CreatePurchaseOrderDto,createdby:string , purchaseOrder:PurchaseOrder):Promise<any>{
   try{
            
             let totalcost=0;
             let saveitem=[];
             
             for (let index = 0; index < model.purchaseItems.length; index++) 
             {
                 
                 const item = model.purchaseItems[index];
                 const product= await this.productRepository.findOne({where:{id:item.productId,isDisabled:false}});
                 if(!product){
                    continue;
                 }
                 let itemp=new OrderItem();
                 itemp.product=product;
                 itemp.ctnqty=item.ctnquanity;
                 itemp.unitqty=item.unitquantity;
                 itemp.retailcost=item.retailcost;
                 itemp.wholesalecost=item.wholesalecost;
                 itemp.linetotalretailCost=(item.retailcost*itemp.unitqty);
                 itemp.linetotalwholesaleCost=(item.wholesalecost*itemp.ctnqty);
                 itemp.createdby=createdby;
                 itemp.purchaseorder=purchaseOrder;
                 itemp.isDisabled=false;
            
                 itemp.updatedby=''
                 const response= await this.purchaseitemRepository.save(itemp);
                 saveitem.push({response})

             }
             purchaseOrder.totalcostprice=totalcost;
             await this.purchaseOrderRepository.save(purchaseOrder);
             return this.apiResponseService.SuccessResponse(
               `${saveitem.length} purcahse items has been created and activated`,
               HttpStatus.OK, saveitem);
         }
         catch (error) {
            console.error('postpurchaseitem Error:',error.message);
            Logger.error(error);
            return new HttpException({
               message: 'Process error while executing operation:',
               code: 500, status: false
            },
               HttpStatus.INTERNAL_SERVER_ERROR);
         }
   }
   async getpurchaseorders(searchparameter: SearchParametersDto,email:string):Promise<any> {
    try{

        
         const validation=await this.payloadService.validateGetPurchaseParametersAsync(searchparameter);
         if(validation.IsValid){

            if(searchparameter.searchtype==PurchaseSearchType.SupplierSearch){

               const begin=searchparameter.supplierSearch.startDate;
               const end=searchparameter.supplierSearch.endDate;
               const response =  await this.purchaseOrderRepository
                  .createQueryBuilder("purchase_order")
                  .leftJoinAndSelect("purchase_order.orderitem", "orderitem")
                  .leftJoinAndSelect("orderitem.product", "product")
                  .innerJoinAndSelect("purchase_order.supplier", "supplier")
                  .where('purchase_order.supplier.id = :id', { id: searchparameter.supplierSearch.supplierId})
                  .andWhere('purchase_order.dateCreated BETWEEN :begin AND :end', { begin: begin,end: end})
                  .orderBy('purchase_order.dateCreated', 'DESC')
                  .cache(6000)
                  .getMany();

                  return this.apiResponseService.SuccessResponse(
                     `${response.length} purcahse info found`,
                     HttpStatus.OK, response);
               
            }
            if(searchparameter.searchtype==PurchaseSearchType.default){

               const response =  await this.purchaseOrderRepository
               .createQueryBuilder("purchase_order")
               .leftJoinAndSelect("purchase_order.orderitem", "orderitem")
               .leftJoinAndSelect("orderitem.product", "product")
               .innerJoinAndSelect("purchase_order.supplier", "supplier")
               .orderBy('purchase_order.dateCreated', 'DESC')
               .take(20)
               .cache(6000)
               .getMany();

                return this.apiResponseService.SuccessResponse(
                  `${response.length} purcahse info found`,
                  HttpStatus.OK, response);
            }
            if(searchparameter.searchtype==PurchaseSearchType.DateRangeSearch){

               const begin=searchparameter.supplierSearch.startDate;
               const end=searchparameter.supplierSearch.endDate;
               const response =  await this.purchaseOrderRepository
                  .createQueryBuilder("purchase_order")
                  .leftJoinAndSelect("purchase_order.orderitem", "orderitem")
                  .leftJoinAndSelect("orderitem.product", "product")
                  .innerJoinAndSelect("purchase_order.supplier", "supplier")
                  .where('purchase_order.dateCreated BETWEEN :begin AND :end', { begin: begin,end: end})
                  .orderBy('purchase_order.dateCreated', 'DESC')
                  .cache(6000)
                  .getMany();
              
                  return this.apiResponseService.SuccessResponse(
                 `${response.length} purcahse info found`,
                 HttpStatus.OK, response);
            }
            if(searchparameter.searchtype==PurchaseSearchType.logedInUser){

               const response =  await this.purchaseOrderRepository
               .createQueryBuilder("purchase_order")
               .leftJoinAndSelect("purchase_order.orderitem", "orderitem")
               .leftJoinAndSelect("orderitem.product", "product")
               .innerJoinAndSelect("purchase_order.supplier", "supplier")
               .where('purchase_order.createdby  :userid', { userid: email})
               .orderBy('purchase_order.dateCreated', 'DESC')
               .take(20)
               .cache(6000)
               .getMany();

                return this.apiResponseService.SuccessResponse(
                  `${response.length} purcahse info found`,
                  HttpStatus.OK, response);
            }
            

          
         }
         return await this.payloadService.badRequestErrorMessage(validation);
      }
      catch (error) {
         console.error('getpurchaseorders Error:',error.message);
         Logger.error(error);
         return new HttpException({
            message: 'Process error while executing operation:',
            code: 500, status: false
         },
            HttpStatus.INTERNAL_SERVER_ERROR);
      }
   }
   async approvePurchaseOrder(model: ApprovePurchaseOrderDto, email: string):Promise<any> 
   {
      try{
         const validation=await this.payloadService.validateConfirmPurchaseOrderAsync(model);
         if(validation.IsValid){

            const purchase=await this.purchaseOrderRepository.findOne({where:{id:model.purchaseorderId,transactionstatus:TransactionStatusEnum.Created}});
            if(purchase){
               
               if(model.status){
                  var type: TransactionStatusEnum =  TransactionStatusEnum.Approved;
                  purchase.transactionstatus=TransactionStatusEnum[type]
                  purchase.transactionstatusId=TransactionStatusEnum.Approved;
               }
               else{
                  var type: TransactionStatusEnum =  TransactionStatusEnum.Rejected;
                  purchase.transactionstatus=TransactionStatusEnum[type]
                  purchase.transactionstatusId=TransactionStatusEnum.Rejected;
               }
               purchase.comments=model.comment;
               purchase.updatedby=email;
               await this.purchaseOrderRepository.save(purchase);
               return this.apiResponseService.SuccessResponse(
                  `Purshase order status has been changed`,
                  HttpStatus.OK, purchase);
            }
            return this.apiResponseService.FailedBadRequestResponse(
               `invalid purchase order id or purchase order status has changed`,
               HttpStatus.BAD_REQUEST, '');

         }
         return await this.payloadService.badRequestErrorMessage(validation);
      }
      catch (error) {
         console.error('getpurchaseorders Error:',error.message);
         Logger.error(error);
         return new HttpException({
            message: 'Process error while executing operation:',
            code: 500, status: false
         },
            HttpStatus.INTERNAL_SERVER_ERROR);
      }
   }
}
