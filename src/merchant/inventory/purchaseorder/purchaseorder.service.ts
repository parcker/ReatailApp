import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { CreatePurchaseOrderHeaderDto } from '../../../app-Dto/purcahseorder.dto';
import { Business, BusinessLocation } from '../../../entities/business.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiResponseService } from '../../../shared/response/apiResponse.service';
import { PayloadvalidationService } from '../../../shared/payloadvalidation/payloadvalidation.service';
import { PurchaseOrder } from '../../../entities/order.entity';
import { Repository } from 'typeorm';
import { Supplier } from '../../../entities/partner.entity';

import { SettingsService } from '../../settings/settings.service';
import { PostingType, TransactionStatusEnum, DocType } from '../../../enums/settings.enum';

@Injectable()
export class PurchaseorderService {

   constructor(@InjectRepository(PurchaseOrder) private readonly purchaseOrderRepository: Repository<PurchaseOrder>,
      @InjectRepository(Supplier) private readonly supplierRepository: Repository<Supplier>,
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
            purchaseorder.postingTypeId = PostingType.Normal;
            purchaseorder.transactionstatusId = TransactionStatusEnum.Created;
            purchaseorder.businesslocation = await this.businesslocationRepository.findOne({ where: { business: business, id: purchaseorderlocationId } });
            purchaseorder.doctypeId = DocType.PurchaseOrder;
            purchaseorder.isDisabled = false;
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
         Logger.error(error);
         return new HttpException({
            message: 'Process error while executing operation:',
            code: 500, status: false
         },
            HttpStatus.INTERNAL_SERVER_ERROR);
      }
   }
}
