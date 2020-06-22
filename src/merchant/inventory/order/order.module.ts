import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplier } from '../../../entities/partner.entity';
import { Business, BusinessLocation } from '../../../entities/business.entity';
import { Product } from '../../../entities/product.entity';
import {OrderItem, OrderPayment, PurchaseOrder } from '../../../entities/order.entity';
import { OrderService } from './order.service';
import { Category, SubCategory } from '../../../entities/category.entity';

@Module({
  
  imports: [
    TypeOrmModule.forFeature([Supplier,Product,Category,SubCategory,Business,BusinessLocation,PurchaseOrder,OrderItem,OrderPayment])
  ],
  controllers: [OrderController],
  providers: [OrderService],
      exports:[OrderService]
})
export class OrderModule {}
