import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Business, BusinessLocation } from '../../entities/business.entity';
import { Supplier, Customer } from '../../entities/partner.entity';

import { PartnersService } from './partners.service';
import { PayloadvalidationModule } from '../../shared/payloadvalidation/payloadvalidation.module';
import { ApiResponseModule } from '../../shared/response/apiResponse.module';
import { CustomerController } from './partners.controller';
import { SupplierController } from './supplier.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Supplier,Customer,Business,BusinessLocation]),
        PayloadvalidationModule,
        ApiResponseModule
      ],
      controllers: [CustomerController,SupplierController],
      providers: [PartnersService],
      exports:[PartnersService]

})
export class PartnersModule {}
