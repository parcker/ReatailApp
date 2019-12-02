import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order, OrderItem, OrderPayment } from '../entities/order.entity';
import { Repository } from 'typeorm';
import { BusinessLocation, Business } from '../entities/business.entity';
import { Product } from '../entities/product.entity';
import { CreateOrderDto, CreateOrderitemDto } from '../app-Dto/order.dto';
import { ResponseObj } from '../shared/generic.response';
import { Supplier } from '../entities/partner.entity';

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

    async postorder(order: CreateOrderDto, orderitems: CreateOrderitemDto[], createdby: string): Promise<any> {
        try {

            let getbusinessInfo = await this.businessRepository.findOne({ where: { id: order.buisnessId, isDisabled: false } });
            if (!getbusinessInfo) {

                let result = new ResponseObj<string>();
                result.message = `invalid or business  Id , no business  data found`;
                result.status = false;
                result.result = '';
                return result;
            }
            let getbusinesslocationInfo = await this.businesslocationRepository.findOne({ where: { id: order.businesslocationId, isDisabled: false } });
            if (!getbusinesslocationInfo) {

                let result = new ResponseObj<string>();
                result.message = `invalid or business location  Id , no business  data found`;
                result.status = false;
                result.result = '';
                return result;
            }
            let getsupplierInfo = await this.supplierRepository.findOne({ where: { id: order.businesslocationId, isDisabled: false } });
            if (!getsupplierInfo) {

                let result = new ResponseObj<string>();
                result.message = `invalid or supplier location  Id , no business  data found`;
                result.status = false;
                result.result = '';
                return result;
            }
            let ordermodel=new Order();
            ordermodel.invoiceNumber=order.invoiceNumber;
            ordermodel.supplier=getsupplierInfo;
            ordermodel.createdby=createdby;
            ordermodel.orderstatus=order.orderstatus;
            ordermodel.business=getbusinessInfo;
            ordermodel.businesslocation=getbusinesslocationInfo;
            ordermodel.updatedby='';
            ordermodel.totalcostprice=order.totalcostprice;
            ordermodel.isDisabled=false;
            let response = await this.orderRepository.save(ordermodel);
            
            let countitem=0;
            let countinserterror=0;

            for (let item of orderitems) {
                
                let getproductInfo = await this.productRepository.findOne({ where: { id: item.productId, isDisabled: false } });
                if (!getsupplierInfo) {
                    countitem++;
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
                countinserterror++;
            }
          

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
