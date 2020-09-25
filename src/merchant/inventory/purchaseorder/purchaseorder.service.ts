import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import {CreatePurchaseOrderDto, ApprovePurchaseOrderDto, GrnSummaryDto } from '../../../app-Dto/merchant/purcahseorder.dto';
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
import { ProductConfiguration } from '../../../entities/productconfiguration.entity';

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
             purchaseOrder.orderitem=[];
             for (let index = 0; index < model.purchaseItems.length; index++) 
             {
                
                 const item = model.purchaseItems[index];
                // console.log('Looping =>',item,index)
                 const product= await this.productRepository.findOne({where:{id:item.productId,isDisabled:false},relations:['product_configuration']});
                 let itemp=new OrderItem();
                 itemp.product=product;
                 itemp.ctnqty=item.ctnquantity;
                 itemp.unitqty=item.unitquantity;
                 itemp.parkinginfo=product.productconfiguration.pack,
                 itemp.retailcost=item.retailcost;
                 itemp.wholesalecost=item.wholesalecost;
                 itemp.linetotalretailCost=(item.retailcost*itemp.unitqty);
                 itemp.linetotalwholesaleCost=(item.wholesalecost*itemp.ctnqty);
                 itemp.createdby=createdby;
                 itemp.purchaseorder=purchaseOrder;
                 itemp.isDisabled=false;
                 itemp.updatedby =''
                 purchaseOrder.orderitem.push(itemp);

             }
            
             const response= await this.purchaseitemRepository.save(purchaseOrder.orderitem);
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
   async getpurchaseorders(searchparameter: SearchParametersDto,email:string,business:Business):Promise<any> {
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
                  .leftJoinAndSelect("purchase_order.supplier", "supplier")
                  .leftJoinAndSelect("purchase_order.shipbusinesslocation", "business_location")
                  .leftJoinAndSelect("purchase_order.warehouse", "warehouse")
                  .where('purchase_order.supplier.id = :id', { id: searchparameter.supplierSearch.supplierId})
                  .andWhere('purchase_order.dateCreated BETWEEN :begin AND :end', { begin: begin,end: end})
                  .andWhere('orderitem.isDisabled = :status', { status:false})
                  .andWhere("purchase_order.transactionstatusId IN :a", { a: [TransactionStatusEnum.Created,TransactionStatusEnum.Rejected]})
                  .orderBy('purchase_order.dateCreated', 'DESC')
                  .getMany();

                  console.log('Purcharse Info',PurchaseSearchType.SupplierSearch,response);
                  return this.apiResponseService.SuccessResponse(
                     `${response.length} purcahse info found`,
                     HttpStatus.OK, response);
               
            }
            else if (searchparameter.searchtype==PurchaseSearchType.default){

               const response =  await this.purchaseOrderRepository
               .createQueryBuilder("purchase_order")
               .leftJoinAndSelect("purchase_order.orderitem", "orderitem")
               .leftJoinAndSelect("orderitem.product", "product")
               .leftJoinAndSelect("purchase_order.supplier", "supplier")
               .leftJoinAndSelect("purchase_order.shipbusinesslocation", "business_location")
               .leftJoinAndSelect("purchase_order.warehouse", "warehouse")
               .where('orderitem.isDisabled = :status', { status:false})
               .andWhere("purchase_order.transactionstatusId IN :a", { a: [TransactionStatusEnum.Created,TransactionStatusEnum.Rejected]})
               .orderBy('purchase_order.dateCreated', 'DESC')
               .take(100)
               .getMany();
               console.log('Purcharse Info',PurchaseSearchType.default,response);
                return this.apiResponseService.SuccessResponse(
                  `${response.length} purcahse info found`,
                  HttpStatus.OK, response);
            }
            else if (searchparameter.searchtype==PurchaseSearchType.DateRangeSearch){

               const begin=searchparameter.supplierSearch.startDate;
               const end=searchparameter.supplierSearch.endDate;
               const response =  await this.purchaseOrderRepository
                  .createQueryBuilder("purchase_order")
                  .leftJoinAndSelect("purchase_order.orderitem", "orderitem")
                  .leftJoinAndSelect("orderitem.product", "product")
                  .leftJoinAndSelect("purchase_order.supplier", "supplier")
                  .leftJoinAndSelect("purchase_order.shipbusinesslocation", "business_location")
                  .leftJoinAndSelect("purchase_order.warehouse", "warehouse")
                  .where('purchase_order.dateCreated BETWEEN :begin AND :end', { begin: begin,end: end})
                  .andWhere('orderitem.isDisabled = :status', { status:false})
                  .andWhere("purchase_order.transactionstatusId IN :a", { a: [TransactionStatusEnum.Created,TransactionStatusEnum.Rejected]})
                  .orderBy('purchase_order.dateCreated', 'DESC')
                  .getMany();
                  console.log('Purcharse Info',PurchaseSearchType.DateRangeSearch,begin,end,response);
                  return this.apiResponseService.SuccessResponse(
                 `${response.length} purcahse info found`,
                 HttpStatus.OK, response);
            }
            else if (searchparameter.searchtype==PurchaseSearchType.logedInUser){

               const response =  await this.purchaseOrderRepository
               .createQueryBuilder("purchase_order")
               .leftJoinAndSelect("purchase_order.orderitem", "orderitem")
               .leftJoinAndSelect("orderitem.product", "product")
               .leftJoinAndSelect("purchase_order.supplier", "supplier")
               .leftJoinAndSelect("purchase_order.shipbusinesslocation", "business_location")
               .leftJoinAndSelect("purchase_order.warehouse", "warehouse")
               .where('purchase_order.createdby  :userid', { userid: email})
               .andWhere('orderitem.isDisabled = :status', { status:false})
               .andWhere("purchase_order.transactionstatusId IN :a", { a: [TransactionStatusEnum.Created,TransactionStatusEnum.Rejected]})
               .orderBy('purchase_order.dateCreated', 'DESC')
              .getMany();
              console.log('Purcharse Info',PurchaseSearchType.logedInUser,response);
                return this.apiResponseService.SuccessResponse(
                  `${response.length} purcahse info found`,
                  HttpStatus.OK, response);
            }
            else if (searchparameter.searchtype==PurchaseSearchType.InvoiceSearch){

               const response =  await this.purchaseOrderRepository
               .createQueryBuilder("purchase_order")
               .leftJoinAndSelect("purchase_order.orderitem", "orderitem")
               .leftJoinAndSelect("orderitem.product", "product")
               .leftJoinAndSelect("purchase_order.supplier", "supplier")
               .leftJoinAndSelect("purchase_order.shipbusinesslocation", "business_location")
               .leftJoinAndSelect("purchase_order.warehouse", "warehouse")
               .where('purchase_order.inputedinvoicenumber  :invoicenumber', { invoicenumber: searchparameter.invoiceNumber})
               .andWhere('orderitem.isDisabled = :status', { status:false})
               .andWhere("purchase_order.transactionstatusId IN :a", { a: [TransactionStatusEnum.Created,TransactionStatusEnum.Rejected]})
               .orderBy('purchase_order.dateCreated', 'DESC')
               .getMany();
               console.log('Purcharse Info',PurchaseSearchType.InvoiceSearch,response);
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
   async getgoodsRecieved():Promise<any>{

   }
   async approvePurchaseOrder(model: ApprovePurchaseOrderDto, email: string):Promise<any> 
   {
      try{
         const purchase=await this.purchaseOrderRepository.findOne({where:{id:model.purchaseorderId,transactionstatusId:TransactionStatusEnum.Created}});
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
            purchase.comments =`{message:${model.comment},type:purchaseordercomment};`
           // purchase.comments=model.comment;
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

   async convertToGoodsRecievedNote(purchaseorderId: number, email: string,business:Business):Promise<any> 
   {
      try{
         const purchase=await this.purchaseOrderRepository.findOne({where:{id:purchaseorderId,transactionstatusId:TransactionStatusEnum.Approved,business:business}});
         if(purchase){
            
            purchase.doctypeId=DocType.GoodsRecieveNote;
            purchase.updatedby=email;
            await this.purchaseOrderRepository.save(purchase);
            return this.apiResponseService.SuccessResponse(
               `Purshase order  has been converted`,
               HttpStatus.OK, purchase);
         }
         return this.apiResponseService.FailedBadRequestResponse(
            `invalid purchase order id or purchase order status has changed`,
            HttpStatus.BAD_REQUEST, '');
      }
      catch (error) {
         console.error('convertToGoodsRecievedNote Error:',error.message);
         Logger.error(error);
         return new HttpException({
            message: 'Process error while executing operation:',
            code: 500, status: false
         },
            HttpStatus.INTERNAL_SERVER_ERROR);
      }
   }
   
   async updatePurchaseOrder(model: CreatePurchaseOrderDto,purshaseId:number,updatedby:string,business: Business):Promise<any>{

      try{
  
         let validationResult = await this.payloadService.validatePurchaseOrderHeaderAsync(model);
         if (validationResult.IsValid) {

            
            const purchaseorder =  await this.purchaseOrderRepository
            .createQueryBuilder("purchase_order")
            .leftJoinAndSelect("purchase_order.orderitem", "orderitem")
            .leftJoinAndSelect("orderitem.product", "product")
            .leftJoinAndSelect("purchase_order.supplier", "supplier")
            .leftJoinAndSelect("purchase_order.shipbusinesslocation", "business_location")
            .leftJoinAndSelect("purchase_order.warehouse", "warehouse")
            .leftJoin("purchase_order.business", "business")
            .where("purchase_order.id= :id", { id: purshaseId})
            .andWhere("business.id= :a", { a: business.id})
            //.andWhere("orderitem.purchaseorder.id= :b", { b: purshaseId})
            .orderBy('purchase_order.dateCreated', 'DESC')
            .getOne();

           
            if (!purchaseorder) {
   
               return this.apiResponseService.FailedBadRequestResponse(
                  `invalid or Purchase order Id , no purchase order  data found`,
                  HttpStatus.BAD_REQUEST, '');
            }
            if(purchaseorder.transactionstatusId!==TransactionStatusEnum.Created){
               return this.apiResponseService.FailedBadRequestResponse(
                  `This Purcahse order can not be updated , status is ${purchaseorder.transactionstatus}`,
                  HttpStatus.BAD_REQUEST, '');
            }
            
           
            if(purchaseorder.warehouse.id!==model.warehouseId){
 
                let warehouse = await this.warehouseRepository.findOne({ where:{id: model.warehouseId,isDisabled:false}});
                if (!warehouse) {
 
                   return this.apiResponseService.FailedBadRequestResponse(
                      `invalid warehouse Id , no warehouse data found`,
                      HttpStatus.BAD_REQUEST, '');
                }
                purchaseorder.warehouse=warehouse;
            }
            
            if(purchaseorder.supplier.id!==model.supplierId){
 
                let supplierinfo = await this.supplierRepository.findOne({ where: { id: model.supplierId, business: business, isDisabled: false } });
                if (!supplierinfo) {
 
                   return this.apiResponseService.FailedBadRequestResponse(
                      `invalid or supplier Id , no supplier data found`,
                      HttpStatus.BAD_REQUEST, '');
                }
                purchaseorder.supplier=supplierinfo;
            }
            purchaseorder.dueDate = model.duedate;
         
           // const purchaseitems=await this.purchaseitemRepository.find({where:{purchaseorder:purchaseorder}});
           // console.error('updatePurchaseOrder ===>:',purchaseorder.orderitem);
            if(purchaseorder.orderitem.length >0){


               for (let index = 0; index < model.purchaseItems.length; index++) {

                     const matchproduct = purchaseorder.orderitem.find(a=>a.product.id===model.purchaseItems[index].productId);
                     if(!matchproduct){
                        //Newlly added product
                        const item = model.purchaseItems[index];
                        console.error('NEw Product to Add ===>:',item);
                        const product= await this.productRepository.findOne({where:{id:item.productId,isDisabled:false}});
                        if(product===undefined){
                           console.error('NEw Product undefined ===>:',undefined);
                           continue;
                        }
                         console.error('NEw Product ===>:',product);
                        let itemp=new OrderItem();
                        itemp.product=product;
                        itemp.ctnqty=item.ctnquantity;
                        itemp.unitqty=item.unitquantity;
                        itemp.retailcost=item.retailcost;
                        itemp.wholesalecost=item.wholesalecost;
                        itemp.linetotalretailCost=(item.retailcost*itemp.unitqty);
                        itemp.linetotalwholesaleCost=(item.wholesalecost*itemp.ctnqty);
                        itemp.createdby=updatedby;
                        itemp.purchaseorder=purchaseorder;
                        itemp.isDisabled=false;
                        itemp.updatedby =''
                        purchaseorder.orderitem.push(itemp)
                     }

               }
      
               for (let index = 0; index < purchaseorder.orderitem.length; index++){
                  
                  const matchproduct = model.purchaseItems.find(a=>a.productId===purchaseorder.orderitem[index].product.id  && purchaseorder.orderitem[index].isDisabled===false);
                
                  if(matchproduct){
                         
                     purchaseorder.orderitem[index].ctnqty=matchproduct.ctnquantity;
                     purchaseorder.orderitem[index].unitqty=matchproduct.unitquantity;
                     purchaseorder.orderitem[index].retailcost=matchproduct.retailcost;
                     purchaseorder.orderitem[index].wholesalecost=matchproduct.wholesalecost;
                     purchaseorder.orderitem[index].linetotalretailCost=(matchproduct.retailcost*purchaseorder.orderitem[index].unitqty);
                     purchaseorder.orderitem[index].linetotalwholesaleCost=(matchproduct.wholesalecost*purchaseorder.orderitem[index].ctnqty);
                     purchaseorder.orderitem[index].updatedby =updatedby;
                    
                 }
                 else{
                     console.error('Not In list ===>:',purchaseorder.orderitem[index].product); 
                     purchaseorder.orderitem[index].isDisabled=true;
                   
                 }
               }
               await this.purchaseitemRepository.save(purchaseorder.orderitem);
               await this.purchaseOrderRepository.save(purchaseorder);
               return this.apiResponseService.SuccessResponse(
               `Purshase order has been updated`,
               HttpStatus.OK, '');
            }
            return this.apiResponseService.FailedBadRequestResponse(
            `Purshase order errors `,
            HttpStatus.INTERNAL_SERVER_ERROR, '');
        }
         return await this.payloadService.badRequestErrorMessage(validationResult);
          
        }
        catch (error) {
           console.error('updatePurchaseOrder Error:',error.message);
           Logger.error(error);
           return new HttpException({
              message: 'Process error while executing operation:',
              code: 500, status: false
           },
              HttpStatus.INTERNAL_SERVER_ERROR);
        }
       
   }
   
   async emailpurchaseOrder(purchaseOrderId:number,emailcontent:string):Promise<any>{
      try{

      }
      catch (error) {
         console.error('emailpurchaseOrder Error:',error.message);
         Logger.error(error);
         return new HttpException({
            message: 'Process error while executing operation:',
            code: 500, status: false
         },
            HttpStatus.INTERNAL_SERVER_ERROR);
       }
   }

   async recievesupplies(model:GrnSummaryDto,email: string):Promise<any>{
      try{

         let validationResult = await this.payloadService.validatePostGrnAsync(model);
         if(validationResult.IsValid){

            const getpurchaseItem=await this.purchaseitemRepository
            .createQueryBuilder("order_item")
            .leftJoinAndSelect("order_item.purchaseorder", "purchaseorder")
            .leftJoinAndSelect("order_item.product", "product")
            .where('purchaseorder.id =:id', { id: model.purchaseorderid})
            .andWhere('purchaseorder.doctypeId = :doctypeId', { doctypeId:DocType.GoodsRecieveNote})
            .getMany();
            if(!getpurchaseItem){

               return this.apiResponseService.SuccessResponse(
                  `${getpurchaseItem.length} purchase order item not found`,
                  HttpStatus.OK, getpurchaseItem);
            }
          
            for (let index = 0; index < model.purchaseItems.length; index++) {
              
               const matchproduct = getpurchaseItem.find(a=>a.product.id===model.purchaseItems[index].productid);
               matchproduct.suppliedctnqty=model.purchaseItems[index].suppliedqty;
               matchproduct.updatedby=email;
               
               
            }
            if(model.comment.length>0){
               getpurchaseItem[0].purchaseorder.comments +=`{message:${model.comment},type:grn}`
            }
            var type: TransactionStatusEnum =  TransactionStatusEnum.Closed;
            getpurchaseItem[0].purchaseorder.transactionstatusId=TransactionStatusEnum.Closed;
            getpurchaseItem[0].purchaseorder.transactionstatus=TransactionStatusEnum[type];
            await this.purchaseitemRepository.save(getpurchaseItem);
            await this.purchaseOrderRepository.save(getpurchaseItem[0].purchaseorder);
            return this.apiResponseService.SuccessResponse(
               `${model.purchaseItems.length} successfully recieved supplied quantity`,
               HttpStatus.OK, '');
         }
         return await this.payloadService.badRequestErrorMessage(validationResult);
      }
      catch (error) {
         console.error('recievesupplies Error:',error.message);
         Logger.error(error);
         return new HttpException({
            message: 'Process error while executing operation:',
            code: 500, status: false
         },
            HttpStatus.INTERNAL_SERVER_ERROR);
       }

   }
  

}

