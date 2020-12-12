import { Module } from '@nestjs/common';
import { PurchaseorderController } from './purchaseorder.controller';
import { PurchaseorderService } from './purchaseorder.service';
import { PayloadvalidationModule } from '../../../shared/payloadvalidation/payloadvalidation.module';
import { ApiResponseModule } from '../../../shared/response/apiResponse.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseOrder, OrderItem } from '../../../entities/order.entity';
import { Supplier } from '../../../entities/partner.entity';
import { SettingsModule } from '../../settings/settings.module';
import { BusinessLocation } from '../../../entities/business.entity';
import { Product } from '../../../entities/product.entity';
import { Warehouse } from '../../../entities/warehouse.entity';
import { StoreProduct } from '../../../entities/storeproduct.entity';


@Module({
    imports: [
      TypeOrmModule.forFeature([PurchaseOrder,Supplier,BusinessLocation,Product,OrderItem,Warehouse,StoreProduct]),//
      PayloadvalidationModule,ApiResponseModule,
      SettingsModule
  ],
    providers: [PurchaseorderService],
    controllers: [PurchaseorderController],
    exports: [PurchaseorderService]
  })
export class PurchaseorderModule {}

