import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StockCard } from '../../../entities/stockcard.entity';
import { StockTransferItems } from '../../../entities/stocktransferitems.entity';
import { StoreProduct } from '../../../entities/storeproduct.entity';
import { StockDirection, TransferItemStatus, TransferStatus } from '../../../enums/settings.enum';
import { ApiResponseService } from '../../../shared/response/apiResponse.service';

@Injectable()
export class StockmanagementService {

    constructor(@InjectRepository(StoreProduct) private readonly _stockRepository: Repository<StoreProduct>,
    @InjectRepository(StockCard) private readonly _stockcardRepository: Repository<StockCard>,
    private readonly apiResponseService: ApiResponseService
   
 ) {

 }

 async stockUpdateforTransfers(item:StockTransferItems[],actionby:string):Promise<any>{

    try{
          
          let merchantstocklist:StoreProduct[];
          let successfullmerchantstockupdate;
          let failedmerchantstockupdate;
          let faileditems:StockTransferItems[]
          for (let index = 0; index < item.length; index++)
          {
                const element = item[index];
                const stockinfo=await this._stockRepository.createQueryBuilder("st")
                .leftJoin("st.product","p")
                .select(["st"])
                .where("p.Id = :Id", { Id:element.product.id})
                .andWhere("st.warehouseId IN(:...ids)",{ids:[element.fromwarehouseId,element.towarehouseId]}).getMany();
                if(!stockinfo)
				{
                    failedmerchantstockupdate++;
                    faileditems.push(element);
                    continue;
                }
                const fromwarehouse=stockinfo.find(c=>c.warehouse.id=element.fromwarehouseId);
                fromwarehouse.instockqty=(fromwarehouse.instockqty-element.approvedqty);

                ///
                await this.stockMovementLogging("stockUpdateforTransfers:",element.approvedqty,StockDirection.Out,element.fromwarehouseId,actionby,"");

                const towarehouse=stockinfo.find(c=>c.warehouse.id=element.towarehouseId);
                towarehouse.instockqty=towarehouse.instockqty+ element.approvedqty;
                ///
                await this.stockMovementLogging("stockUpdateforTransfers:",element.approvedqty,StockDirection.In,element.towarehouseId,actionby,"");

                element.itemStatus=TransferItemStatus.Approved;
                merchantstocklist.push(fromwarehouse,towarehouse);
                successfullmerchantstockupdate++;

           } 

          await this._stockRepository.save(merchantstocklist);
          return this.apiResponseService.SuccessResponse( `total count ${successfullmerchantstockupdate} Transfer items were approved ,total count of ${failedmerchantstockupdate} failed`,HttpStatus.OK, item);
    }
    catch (error) {

        console.error('stockUpdateDual Error:',error.message);
        Logger.error(error);
        return new HttpException({ message: 'Process error while executing operation:', code: 500, status: false }, HttpStatus.INTERNAL_SERVER_ERROR);
     }

 }
 async stockUpdateforRequest(item:StockTransferItems[],actionby:string):Promise<any>{

  try {
  
    let merchantstocklist:StoreProduct[];
    let successfullmerchantstockupdate;
    let failedmerchantstockupdate;
    let faileditems:StockTransferItems[]
    for (let index = 0; index < item.length; index++)
    {
          const element = item[index];
          const stockinfo=await this._stockRepository.createQueryBuilder("st")
          .leftJoin("st.product","p")
          .select(["st"])
          .where("p.Id = :Id", { Id:element.product.id})
          .andWhere("st.warehouseId IN(:...ids)",{ids:[element.fromwarehouseId,element.towarehouseId]}).getMany();
          if(!stockinfo)
          {
              failedmerchantstockupdate++;
              faileditems.push(element);
              continue;
          }
          const fromwarehouse=stockinfo.find(c=>c.warehouse.id=element.fromwarehouseId);
          fromwarehouse.instockqty=(fromwarehouse.instockqty-element.approvedqty);

         ///
          await this.stockMovementLogging("stockUpdateforRequest:",element.approvedqty,StockDirection.Out,element.fromwarehouseId,actionby,"");


          const towarehouse=stockinfo.find(c=>c.warehouse.id=element.towarehouseId);
          towarehouse.instockqty=towarehouse.instockqty+ element.approvedqty;

          await this.stockMovementLogging("stockUpdateforRequest:",element.approvedqty,StockDirection.In,element.towarehouseId,actionby,"");
          element.itemStatus=TransferItemStatus.Approved;
          merchantstocklist.push(fromwarehouse,towarehouse);
          successfullmerchantstockupdate++;
     } 
    

    await this._stockRepository.save(merchantstocklist);
    return this.apiResponseService.SuccessResponse( `total count ${successfullmerchantstockupdate} Transfer items were approved ,total count of ${failedmerchantstockupdate} failed`,HttpStatus.OK, item);


    }
    catch (error) {

        console.error('stockUpdateSingle Error:',error.message);
        Logger.error(error);
        return new HttpException({ message: 'Process error while executing operation:', code: 500, status: false }, HttpStatus.INTERNAL_SERVER_ERROR);
     }

 }

 async stockMovementLogging(operation:string,quantity:number,flow:StockDirection,warehouseid:string,createdby:string,updatedby:string):Promise<any>{

    try{
            const stockLog=new StockCard();
            stockLog.StockMovementDescription=operation;
            stockLog.Quantity=quantity;
            stockLog.Direction=flow;
            stockLog.warehouseId=warehouseid;
            stockLog.createdby=createdby;
            stockLog.updatedby=updatedby;
            stockLog.isDisabled=false;
            stockLog.deletedby="";
            stockLog.approvedby="";
            await this._stockcardRepository.save(stockLog);
            
    }
    catch (error) {

        console.error('stockMovementLogging Error:',error.message);
        Logger.error(error);
        return new HttpException({ message: 'Process error while executing operation:', code: 500, status: false }, HttpStatus.INTERNAL_SERVER_ERROR);
     }

 }

}
