import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { SaleOrderDto, SalesItemDto } from '../../../app-Dto/merchant/saleorder.dto';
import { Sales } from '../../../entities/sales.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { async } from 'rxjs/internal/scheduler/async';
import { SalesItems } from '../../../entities/salesitems.entity';
import { ApiResponseService } from '../../../shared/response/apiResponse.service';
import { SettingsService } from '../../settings/settings.service';
import { Business, BusinessLocation } from '../../../entities/business.entity';
import { Customer } from '../../../entities/partner.entity';
import { SalesLevel } from '../../../enums/settings.enum';
import { Product } from '../../../entities/product.entity';
import { Warehouse } from '../../../entities/warehouse.entity';
import { PayloadvalidationService } from '../../../shared/payloadvalidation/payloadvalidation.service';

@Injectable()
export class WholesaleService {

     constructor(
        @InjectRepository(Sales) private readonly salesRepository: Repository<Sales>,
        @InjectRepository(SalesItems) private readonly saleitemRepository: Repository<SalesItems>,
        @InjectRepository(Customer) private readonly customerRepository: Repository<Customer>,
        @InjectRepository(Product) private readonly productRepository: Repository<Product>,
      //  @InjectRepository(Warehouse) private readonly warehouseRepository: Repository<Warehouse>,
        private readonly apiResponseService: ApiResponseService,
        private readonly settingService: SettingsService,
        private readonly payloadService: PayloadvalidationService
   ) {}
   
   async salesOrderInfo(salesorder: SaleOrderDto, createdby: string, business: Business,businesslocation:BusinessLocation):Promise<any> {

    try
    {
        let validationResult = await this.payloadService.validateSalesOrderAsync(salesorder);
        if(validationResult.IsValid){

            const customer= await this.customerRepository.findOne({where:{id:salesorder.customerId}});
            if(!customer){

                    return this.apiResponseService.FailedBadRequestResponse(
                        `invalid or customer Id , no customer data found`,
                        HttpStatus.BAD_REQUEST, '');
            }
   
            const sale=new Sales();
            sale.total=(salesorder.taxTotal + salesorder.subTotal + salesorder.totalcharges) ;
            sale.type=salesorder.saleType;
            sale.createdby=createdby;
            sale.customer=customer;
            sale.deliveryDate=salesorder.deliveryDate;
            sale.totalcharges=salesorder.totalcharges;
            sale.subTotal=salesorder.subTotal;
            sale.level=SalesLevel.SaleOrder;
            sale.taxTotal=salesorder.taxTotal;
            sale.paymenttermId=salesorder.paymenttermId;
            sale.isDisabled=false;
            sale.chargesinfo=salesorder.chargesinfo;

      
            for (const item of salesorder.salesItems) {

                const saleitem=new SalesItems();
                saleitem.product=await this.productRepository.findOne({where:{id:item.productId}});
                saleitem.warehouseId=item.warehouseId;
                saleitem.businesslocationId=businesslocation.id;
                saleitem.isDisabled=false;
                saleitem.createdby=createdby;
                saleitem.updatedby="";
                saleitem.tax=item.tax;
                saleitem.taxValue=item.taxValue;
                saleitem.price=item.price;
                saleitem.lineamount=item.price*item.lineamount;
                saleitem.unitQty=item.unitQty;
                saleitem.ctnQty=item.ctnQty;
                sale.saleitem.push();

            }
       
      const response= await this.salesRepository.save(sale);
       return this.apiResponseService.SuccessResponse(
        `Sales Order has been raised , Move to sale invoice to complete transaction`,
        HttpStatus.OK, response);
    }
    return await this.payloadService.badRequestErrorMessage(validationResult);

       
    }
    catch (error) {
        console.error('salesOrderInfo Error:',error.message);
               return new HttpException({
           message: 'Process error while executing operation:',
           code: 500, status: false
        },
         HttpStatus.INTERNAL_SERVER_ERROR);
     }
   }
    //    async postSalesItems(salesItems:SalesItems[],createdby: string,saleId:string):Promise<any>{
    //      try{


            
    //      }
    //      catch (error) {
    //         console.error('postSalesItems Error:',error.message);
    //                return new HttpException({
    //            message: 'Process error while executing operation:',
    //            code: 500, status: false
    //         },
    //          HttpStatus.INTERNAL_SERVER_ERROR);
    //      }
    //    }

  
}
