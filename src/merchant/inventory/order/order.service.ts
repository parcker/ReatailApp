import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {OrderItem, OrderPayment, PurchaseOrder } from '../../../entities/order.entity';
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
    constructor(@InjectRepository(PurchaseOrder) private readonly orderRepository: Repository<PurchaseOrder>,
        @InjectRepository(OrderItem) private readonly oderitemRepository: Repository<OrderItem>,
        @InjectRepository(Product) private readonly productRepository: Repository<Product>,
        @InjectRepository(BusinessLocation) private readonly businesslocationRepository: Repository<BusinessLocation>,
        @InjectRepository(Business) private readonly businessRepository: Repository<Business>,
        @InjectRepository(OrderPayment) private readonly orderpaymentRepository: Repository<OrderPayment>,
        @InjectRepository(Supplier) private readonly supplierRepository: Repository<Supplier>) {


    }


}
