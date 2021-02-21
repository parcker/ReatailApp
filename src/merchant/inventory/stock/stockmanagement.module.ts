import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../../../entities/product.entity';
import { StockCard } from '../../../entities/stockcard.entity';
import { StoreProduct } from '../../../entities/storeproduct.entity';
import { Warehouse } from '../../../entities/warehouse.entity';
import { PayloadvalidationModule } from '../../../shared/payloadvalidation/payloadvalidation.module';
import { ApiResponseModule } from '../../../shared/response/apiResponse.module';
import { StockmanagementService } from './stockmanagement.service';
import { StockmanagmentController } from './stockmanagment.controller';

@Module({
    imports: [
      TypeOrmModule.forFeature([StoreProduct,Warehouse,Product,StockCard]),
      PayloadvalidationModule,ApiResponseModule
    ],
    providers: [StockmanagementService],
    controllers: [StockmanagmentController],
    exports: [StockmanagementService]
  })
export class StockmanagementModule {}

