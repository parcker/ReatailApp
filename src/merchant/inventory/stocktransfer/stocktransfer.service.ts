import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransferRequestDto } from '../../../app-Dto/merchant/transferRequest.dto';
import { StockTransfer } from '../../../entities/stocktransfer.entity';
import { StockTransferItems } from '../../../entities/stocktransferitems.entity';
import { PayloadvalidationService } from '../../../shared/payloadvalidation/payloadvalidation.service';
import { ApiResponseService } from '../../../shared/response/apiResponse.service';
import { SettingsService } from '../../settings/settings.service';

@Injectable()
export class StocktransferService {
    constructor(@InjectRepository(StockTransfer) private readonly _stockTransferOrderRepository: Repository<StockTransfer>,
    @InjectRepository(StockTransferItems) private readonly _stockTransferItemRepository: Repository<StockTransferItems>,
  
    private readonly payloadService: PayloadvalidationService,
    private readonly apiResponseService: ApiResponseService
   
 ) {

 }
 async postTransfer(model:TransferRequestDto):Promise<any>{
     try{
        return this.apiResponseService.SuccessResponse( `Transfer Completed`,HttpStatus.OK, []);

     }
     catch (error) {

        console.error('postTransfer Error:',error.message);
        Logger.error(error);
        return new HttpException({ message: 'Process error while executing operation:', code: 500, status: false }, HttpStatus.INTERNAL_SERVER_ERROR);
     }
 }
}
