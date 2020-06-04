import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order, OrderItem, OrderPayment } from '../../../entities/order.entity';
import { Repository } from 'typeorm';
import { BusinessLocation, Business } from '../../../entities/business.entity';
import { Product } from '../../../entities/product.entity';
import { CreateOrderDto, CreateOrderitemDto } from '../../../app-Dto/order.dto';
import { ResponseObj } from '../../../shared/generic.response';
import { Supplier } from '../../../entities/partner.entity';
import { OrderStatus } from '../../../enums/settings.enum';

@Injectable()
export class OrderService {

    /**
     *
     */
    constructor(@InjectRepository(Order) private readonly orderRepository: Repository<Order>,
        @InjectRepository(OrderItem) private readonly oderitemRepository: Repository<OrderItem>,
        @InjectRepository(Product) private readonly productRepository: Repository<Product>,
        @InjectRepository(BusinessLocation) private readonly businesslocationRepository: Repository<BusinessLocation>,
        @InjectRepository(Business) private readonly businessRepository: Repository<Business>,
        @InjectRepository(OrderPayment) private readonly orderpaymentRepository: Repository<OrderPayment>,
        @InjectRepository(Supplier) private readonly supplierRepository: Repository<Supplier>) {


    }

    async postorder(order: CreateOrderDto, createdby: string,businessId:string): Promise<any> {
        try {

            let getbusinessInfo = await this.businessRepository.findOne({ where: { id: businessId, isDisabled: false } });
            if (!getbusinessInfo) {

                let result = new ResponseObj<string>();
                result.message = `invalid or business info , no business  data found`;
                result.status = false;
                result.result = '';
                return result;
            }
            let getbusinesslocationInfo = await this.businesslocationRepository.findOne({ where: { id: order.businesslocationId, isDisabled: false } });
            if (!getbusinesslocationInfo) {

                let result = new ResponseObj<string>();
                result.message = `invalid or business location info , no business location  data found`;
                result.status = false;
                result.result = '';
                return result;
            }
            let getsupplierInfo = await this.supplierRepository.findOne({ where: { id: order.supplierid, isDisabled: false } });
            if (!getsupplierInfo) {

                let result = new ResponseObj<string>();
                result.message = `invalid or supplier info , no supplier  data found`;
                result.status = false;
                result.result = '';
                return result;
            }
            let getinvoiceInfo = await this.orderRepository.findOne({ where: { invoiceNumber: order.invoiceNumber,business:getbusinessInfo, isDisabled: false } });
            if (getinvoiceInfo) {

                let result = new ResponseObj<string>();
                result.message = `duplicate invoice detected ${order.invoiceNumber}`;
                result.status = false;
                result.result = '';
                return result;
            }
            let ordermodel=new Order();
            ordermodel.invoiceNumber=order.invoiceNumber;
            ordermodel.supplier=getsupplierInfo;
            ordermodel.createdby=createdby;
            ordermodel.orderstatus=OrderStatus.Pending;
           
            ordermodel.businesslocation=getbusinesslocationInfo;
            ordermodel.updatedby='';
            ordermodel.totalcostprice=order.Orderitem.reduce((total, item) => total += item.cost, 0);
            ordermodel.isDisabled=false;
            let response = await this.orderRepository.save(ordermodel);
          
            let countitem=0;
            let countinserterror=0;
         
            for (let item of order.Orderitem) {
                
               
                let getproductInfo = await this.productRepository.findOne({ where: { id: item.productId,business:getbusinessInfo, isDisabled: false } });
                if (!getsupplierInfo) {
                    countinserterror++;
                  continue;
                }
               
                let productitem=new OrderItem();
                productitem.product=getproductInfo;
                productitem.isDisabled=false;
                productitem.order=response;
                productitem.qty=item.qty;
                productitem.cost=item.cost;
                productitem.unitprice=item.unitprice;
                productitem.updatedby='';
                productitem.createdby=createdby;
                productitem.previousqty=0;

                let itemresponse = await this.oderitemRepository.save(productitem);
                if(itemresponse){ countitem ++;}
               
            }
          if(response && countitem==order.Orderitem.length){

            let result = new ResponseObj<string>();
            result.message = `order with invoice number ${response.invoiceNumber}  created, with ${countitem} items captured and status [pending] waiting for approval`;
            result.status = true;
            result.result = '';
            return result;
          }
          if(response && countitem!=order.Orderitem.length){

            let result = new ResponseObj<string>();
            result.message = `order with invoice number ${response.invoiceNumber}  created, with ${countitem} items captured please delete this order because there is an error`;
            result.status = false;
            result.result = '';
            return result;
          }
          let result = new ResponseObj<string>();
            result.message = `order with invoice number ${response.invoiceNumber} could not be created because an error occure please try again`;
            result.status = false;
            result.result = '';
            return result;

        }
        catch (error) {

            Logger.error(error);
            return new
                HttpException({
                    message: 'Process error while executing operation:',
                    code: 500, status: false
                },
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
