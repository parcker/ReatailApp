import { Module } from '@nestjs/common';
import { WholesaleService } from './wholesale.service';
import { WholesaleController } from './wholesale.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../../../entities/product.entity';
import { PayloadvalidationModule } from '../../../shared/payloadvalidation/payloadvalidation.module';
import { ApiResponseModule } from '../../../shared/response/apiResponse.module';
import { SalesItems } from '../../../entities/salesitems.entity';
import { Sales } from '../../../entities/sales.entity';
import { SettingsModule } from '../../settings/settings.module';
import { Customer } from '../../../entities/partner.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product,SalesItems,Sales,Customer]),
    PayloadvalidationModule,ApiResponseModule,SettingsModule
],
  providers: [WholesaleService],
  controllers: [WholesaleController]
})
export class WholesaleModule {}
