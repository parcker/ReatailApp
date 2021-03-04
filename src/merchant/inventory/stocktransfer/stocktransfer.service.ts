import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { response } from 'express';
import { Repository } from 'typeorm';
import { PaginationDto } from '../../../app-Dto/merchant/product.dto';
import { StockUpdateItemDto } from '../../../app-Dto/merchant/stockupdate.dto';
import { TransferRequestApprovalDto, TransferRequestDto } from '../../../app-Dto/merchant/transferRequest.dto';
import { Business } from '../../../entities/business.entity';
import { Product } from '../../../entities/product.entity';
import { StockTransfer } from '../../../entities/stocktransfer.entity';
import { StockTransferItems } from '../../../entities/stocktransferitems.entity';
import { Warehouse } from '../../../entities/warehouse.entity';
import { StockUpdateType, TransferItemStatus, TransferStatus, TransferType } from '../../../enums/settings.enum';
import { ResponseObj } from '../../../shared/generic.response';
import { PayloadvalidationService } from '../../../shared/payloadvalidation/payloadvalidation.service';
import { ApiResponseService } from '../../../shared/response/apiResponse.service';
import { StockmanagementService } from '../stock/stockmanagement.service';
//
@Injectable()
export class StocktransferService {
    constructor(@InjectRepository(StockTransfer) private readonly _stockTransferOrderRepository: Repository<StockTransfer>,
    @InjectRepository(StockTransferItems) private readonly _stockTransferItemRepository: Repository<StockTransferItems>,
    @InjectRepository(Product) private readonly _productRepository: Repository<Product>,
    @InjectRepository(Warehouse) private readonly _warehouseRepository: Repository<Warehouse>,
  
    private readonly payloadService: PayloadvalidationService,
    private readonly apiResponseService: ApiResponseService,
    private readonly _stockService:StockmanagementService,
   
 ) {

 }
   async postTransfer(model:TransferRequestDto,createdby:string):Promise<any>
   {
     try
     {
        let validationResult = await this.payloadService.validateTransferRequestAsync(model);
        if(validationResult.IsValid){

         const result= await this._productRepository.createQueryBuilder('p')
         .where("p.id IN (:...ids)",{ids:model.items.map(c=>c.poductId)})
         .getMany();

         if(result.length!==model.items.length){

            return this.apiResponseService.FailedBadRequestResponse(
               `there are some invalid product id detected from your request`,
               HttpStatus.BAD_REQUEST, '');
         }
         
         const transfer=new StockTransfer();
         transfer.note=model.note;
         transfer.transfertype=model.type;
         transfer.isDisabled = false;

         var type: TransferStatus = TransferStatus.New;
         transfer.statusdescription = TransferStatus[type]
         transfer.createdby = createdby;
         transfer.updatedby = '';
         transfer.approvedby='';
         transfer.deletedby='';
         transfer.stockitems=[];
         for (let index = 0; index < model.items.length; index++) {
            const element = model.items[index];
             
            const item =new StockTransferItems();
            item.qty=element.quantity;
            if(transfer.transfertype==TransferType.Request){
               item.towarehouseId=element.destination;
            }
            if(transfer.transfertype==TransferType.Transfer){
               item.towarehouseId=element.destination;
               item.fromwarehouseId=element.origin;
            }
           item.stockTransferdetail=transfer;
            item.product=result.find(c=>c.id===element.poductId);
            item.isDisabled = false;
            item.createdby = createdby;
            item.updatedby = '';
            item.approvedby='';
            item.deletedby='';
            item.transfertype = transfer.transfertype;
            transfer.stockitems.push(item)
            
         }
         await this._stockTransferOrderRepository.save(transfer);
         await this._stockTransferItemRepository.save(transfer.stockitems  );
         return this.apiResponseService.SuccessResponse(
            `${model.items.length} Items have been created for transfer/Request`,
            HttpStatus.OK, model);
         

        }
        return await this.payloadService.badRequestErrorMessage(validationResult);
       
     }
     catch (error) {

        console.error('postTransfer Error:',error.message);
        Logger.error(error);
        return new HttpException({ message: 'Process error while executing operation:', code: 500, status: false }, HttpStatus.INTERNAL_SERVER_ERROR);
     }
   }
   async getRequests(paginationDto: PaginationDto,transtype:number,transferStatus:number,business:Business):Promise<any>{
      try
      {

         const skippedItems = (paginationDto.page - 1) * paginationDto.limit;

         const warehouse= await this._warehouseRepository.createQueryBuilder("w")
         .leftJoin("w.businesslocation","bl")
         .where("bl.business.id =:businessId",{businessId:business.id})
         .select(['w.id'])
         .getMany();
         if(!warehouse)
         {

            return this.apiResponseService.SuccessResponse(
               `0 product data found`,
               HttpStatus.OK, '');
         }

         const [result,count]=await this._stockTransferOrderRepository.createQueryBuilder('st')
         .leftJoin("st.stockitems","items")
         .where("st.transfertype =:transfertype",{transfertype:transtype})///Request
         .andWhere("items.fromwarehouseId IN (:...ids)",{ids:warehouse.map(c=>c.id)})
         .andWhere("items.transfertype =:transfertype",{transfertype:transtype})//Request
         .andWhere("st.status =:status",{status:transferStatus})
         .select(['st','st.stockitems'])
         .offset(skippedItems)
         .limit(paginationDto.limit)
         .getManyAndCount();

         return this.apiResponseService.SuccessResponse( `total count ${count} page: ${paginationDto.page} limit: ${paginationDto.limit}`,HttpStatus.OK, result);

      }
      catch (error) {

         console.error('getTransferRequests Error:',error.message);
         Logger.error(error);
         return new HttpException({ message: 'Process error while executing operation:', code: 500, status: false }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
   }
   async getTransfers(paginationDto: PaginationDto,transtype:number,transferStatus:number,business:Business):Promise<any>{
      try
      {

         const skippedItems = (paginationDto.page - 1) * paginationDto.limit;

         const warehouse= await this._warehouseRepository.createQueryBuilder("w")
         .leftJoin("w.businesslocation","bl")
         .where("bl.business.id =:businessId",{businessId:business.id})
         .select(['w.id'])
         .getMany();
         if(!warehouse)
         {

            return this.apiResponseService.SuccessResponse(
               `0 product data found`,
               HttpStatus.OK, '');
         }

         const [result,count]=await this._stockTransferOrderRepository.createQueryBuilder('st')
         .leftJoin("st.stockitems","items")
         .where("st.transfertype =:transfertype",{transfertype:transtype})///Request
         .andWhere("items.towarehouseId IN (:...ids)",{ids:warehouse.map(c=>c.id)})
         .andWhere("items.transfertype =:transfertype",{transfertype:transtype})
         .andWhere("st.status =:status",{status:transferStatus})
         .select(['st','items'])
         .offset(skippedItems)
         .limit(paginationDto.limit)
         .getManyAndCount();
      
         return this.apiResponseService.SuccessResponse( `total count ${count} page: ${paginationDto.page} limit: ${paginationDto.limit}`,HttpStatus.OK, result);

      }
      catch (error) {

         console.error('getTransferRequests Error:',error.message);
         Logger.error(error);
         return new HttpException({ message: 'Process error while executing operation:', code: 500, status: false }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
   }
   async approvetransaction(model:TransferRequestApprovalDto,approvedby:string){
      try{

            const checktransferResquest=await this._stockTransferOrderRepository.createQueryBuilder("st")
               .leftJoin("st.StockTransferItems","items")
               .select(["st"])
               .where("st.id = :id", { id:model.stocktransferid})
               .andWhere("items.itemStatus = :itemStatus", { itemStatus:TransferItemStatus.Pending})
            .getOne();

            if(!checktransferResquest){
               return this.apiResponseService.FailedBadRequestResponse(
                  `transfer or Request information could not be found for approval`,
                  HttpStatus.BAD_REQUEST, '');
            }
            
            if(checktransferResquest.transfertype===TransferType.Request)
            {

               const response_request= await this._stockService.stockUpdateforRequest(checktransferResquest.stockitems,approvedby);
               if(response_request.status){
                  checktransferResquest.status=TransferStatus.Completed;
                  await this._stockTransferOrderRepository.save(checktransferResquest);

               }
               return response_request;
            }
            const response_tranfer= await this._stockService.stockUpdateforTransfers(checktransferResquest.stockitems,approvedby);
            if(response_tranfer.status)
            {
               checktransferResquest.status=TransferStatus.Completed;
               await this._stockTransferOrderRepository.save(checktransferResquest);
               
            }
            return response_tranfer;
      }
      catch (error) {

         console.error('approvetransaction tranfer/request Error:',error.message);
         Logger.error(error);
         return new HttpException({ message: 'Process error while executing operation:', code: 500, status: false }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
   }

}
