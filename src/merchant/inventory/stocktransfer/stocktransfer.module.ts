import { Module } from '@nestjs/common';
import { StocktransferService } from './stocktransfer.service';
import { StocktransferController } from './stocktransfer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PayloadvalidationModule } from '../../../shared/payloadvalidation/payloadvalidation.module';
import { ApiResponseModule } from '../../../shared/response/apiResponse.module';
import { StockTransfer } from '../../../entities/stocktransfer.entity';
import { StockTransferItems } from '../../../entities/stocktransferitems.entity';
import { Product } from '../../../entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([StockTransfer,StockTransferItems,Product]),
    PayloadvalidationModule,ApiResponseModule
  ],
  providers: [StocktransferService],
  controllers: [StocktransferController],
  exports: [StocktransferService]
})
export class StocktransferModule {}
