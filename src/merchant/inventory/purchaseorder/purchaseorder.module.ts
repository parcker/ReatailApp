import { Module } from '@nestjs/common';
import { PurchaseorderController } from './purchaseorder.controller';
import { PurchaseorderService } from './purchaseorder.service';
import { PayloadvalidationModule } from '../../../shared/payloadvalidation/payloadvalidation.module';
import { ApiResponseModule } from '../../../shared/response/apiResponse.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseOrder } from '../../../entities/order.entity';
import { Supplier } from '../../../entities/partner.entity';
import { SettingsModule } from '../../settings/settings.module';
import { BusinessLocation } from '../../../entities/business.entity';


@Module({
    imports: [
      TypeOrmModule.forFeature([PurchaseOrder,Supplier,BusinessLocation]),//
      PayloadvalidationModule,ApiResponseModule,
     SettingsModule
  ],
    providers: [PurchaseorderService],
    controllers: [PurchaseorderController],
    exports: [PurchaseorderService]
  })
export class PurchaseorderModule {}

