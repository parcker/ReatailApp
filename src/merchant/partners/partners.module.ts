import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Business } from '../../entities/business.entity';
import { Supplier, Customer } from '../../entities/partner.entity';
import { PartnersController } from './partners.controller';
import { PartnersService } from './partners.service';
import { PayloadvalidationModule } from '../../shared/payloadvalidation/payloadvalidation.module';
import { ApiResponseModule } from '../../shared/response/apiResponse.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Supplier,Customer,Business]),
        PayloadvalidationModule,
        ApiResponseModule
      ],
      controllers: [PartnersController],
      providers: [PartnersService],
      exports:[PartnersService]

})
export class PartnersModule {}
