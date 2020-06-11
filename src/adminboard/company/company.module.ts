import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Business } from "../../entities/business.entity";
import { PayloadvalidationModule } from '../../shared/payloadvalidation/payloadvalidation.module';
import { ApiResponseModule } from '../../shared/response/apiResponse.module';
import { BusinesslocationModule } from '../businesslocation/businesslocation.module';

@Module({
    providers: [CompanyService],
    controllers: [CompanyController],
    imports: [
        TypeOrmModule.forFeature([Business]),
        PayloadvalidationModule,ApiResponseModule,BusinesslocationModule
    ],
    exports: [CompanyService]
})
export class CompanyModule {}
