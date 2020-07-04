import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { CreatePurchaseOrderHeaderDto, CreatePurchaseOrderItemDto } from '../../../app-Dto/purcahseorder.dto';
import { Business, BusinessLocation } from '../../../entities/business.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiResponseService } from '../../../shared/response/apiResponse.service';
import { PayloadvalidationService } from '../../../shared/payloadvalidation/payloadvalidation.service';
import { PurchaseOrder, OrderItem } from '../../../entities/order.entity';
import { Repository } from 'typeorm';
import { Supplier } from '../../../entities/partner.entity';
import { v4 as uuidv4 } from 'uuid';

import { SettingsService } from '../../settings/settings.service';
import { PostingType, TransactionStatusEnum, DocType } from '../../../enums/settings.enum';
import { Product } from '../../../entities/product.entity';

@Injectable()
export class PurchaseorderService {

   constructor(@InjectRepository(PurchaseOrder) private readonly purchaseOrderRepository: Repository<PurchaseOrder>,
      @InjectRepository(Supplier) private readonly supplierRepository: Repository<Supplier>,
      @InjectRepository(Product) private readonly productRepository: Repository<Product>,
      @InjectRepository(OrderItem) private readonly purchaseitemRepository: Repository<OrderItem>,
      @InjectRepository(BusinessLocation) private readonly businesslocationRepository: Repository<BusinessLocation>,
      private readonly payloadService: PayloadvalidationService,
      private readonly apiResponseService: ApiResponseService,
      private readonly settingService: SettingsService
   ) {

   }
   async creatPurchaseHeader(model: CreatePurchaseOrderHeaderDto, business: Business, createdby: string, purchaseorderlocationId: string): Promise<any> {
      try {

         let validationResult = await this.payloadService.validatePurchaseOrderHeaderAsync(model);
         if (validationResult.IsValid) {
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

            //let fiscalyear= await this.settingService.GetCurrentFiscalYear(business);
            let purchaseorder = new PurchaseOrder();
            purchaseorder.fiscalyear = null;
            purchaseorder.invoiceNumber=uuidv4();
            purchaseorder.postingTypeId = PostingType.Normal;
            purchaseorder.transactionstatusId = TransactionStatusEnum.Created;
            purchaseorder.businesslocation = await this.businesslocationRepository.findOne({ where: { business: business, id: purchaseorderlocationId } });
            purchaseorder.doctypeId = DocType.PurchaseOrder;
            purchaseorder.isDisabled = false;
            purchaseorder.supplier=supplierinfo;
            purchaseorder.business = business;
            purchaseorder.createdby = createdby;
            purchaseorder.updatedby = '';
            purchaseorder.isconfirmed = false;
            purchaseorder.shipbusinesslocation = businesslocation;
            purchaseorder.dueDate = model.duedate;
            purchaseorder.inputedinvoiceNumber = model.invoiceNumber;
            let response = await this.purchaseOrderRepository.save(purchaseorder);

            return this.apiResponseService.SuccessResponse(
               `$Purshase order has been created and activated`,
               HttpStatus.OK, response);
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
   async postpurchaseitem(model:CreatePurchaseOrderItemDto,createdby:string):Promise<any>{
         try{
            let pucahseinfo=await this.purchaseOrderRepository.findOne({where:{id:model.purcahseId}});
             if(!pucahseinfo)
             {
               return this.apiResponseService.FailedBadRequestResponse(
                  `invalid or purchase Id , no purchase data found`,
                  HttpStatus.BAD_REQUEST, '');
             }
             let totalcost=0;
             let saveitem=[];
             for (let index = 0; index < model.purchaseItems.length; index++) {
                 
                 const item = model.purchaseItems[index];
                 const product= await this.productRepository.findOne({where:{id:item.productId}});
                 if(!product){
                    continue;
                 }
                 let itemp=new OrderItem();
                 itemp.product=product;
                 itemp.qty=item.quantity;
                 itemp.cost=item.unitcost;
                 itemp.createdby=createdby;
                 itemp.purchaseorder=pucahseinfo;
                 itemp.isDisabled=false;
                 itemp.updatedby=''
                 totalcost+=item.unitcost;
                 const response= await this.purchaseitemRepository.save(itemp);
                 saveitem.push({response})

             }
             pucahseinfo.totalcostprice=totalcost;
             await this.purchaseOrderRepository.save(pucahseinfo);
             return this.apiResponseService.SuccessResponse(
               `${saveitem.length} purcahse items has been created and activated`,
               HttpStatus.OK, saveitem);
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
}
