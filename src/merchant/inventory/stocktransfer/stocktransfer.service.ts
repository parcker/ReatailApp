import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransferRequestDto } from '../../../app-Dto/merchant/transferRequest.dto';
import { Product } from '../../../entities/product.entity';
import { StockTransfer } from '../../../entities/stocktransfer.entity';
import { StockTransferItems } from '../../../entities/stocktransferitems.entity';
import { TransferType } from '../../../enums/settings.enum';
import { PayloadvalidationService } from '../../../shared/payloadvalidation/payloadvalidation.service';
import { ApiResponseService } from '../../../shared/response/apiResponse.service';
//
@Injectable()
export class StocktransferService {
    constructor(@InjectRepository(StockTransfer) private readonly _stockTransferOrderRepository: Repository<StockTransfer>,
    @InjectRepository(StockTransferItems) private readonly _stockTransferItemRepository: Repository<StockTransferItems>,
    @InjectRepository(Product) private readonly _productRepository: Repository<Product>,
  
    private readonly payloadService: PayloadvalidationService,
    private readonly apiResponseService: ApiResponseService
   
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
               HttpStatus.INTERNAL_SERVER_ERROR, '');
         }
         
         const transfer=new StockTransfer();
         transfer.note=model.note;
         transfer.transfertype=model.type;
         transfer.isDisabled = false;
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
}
