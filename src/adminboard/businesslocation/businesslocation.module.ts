import { Module } from '@nestjs/common';
import { BusinesslocationController } from './businesslocation.controller';
import { BusinesslocationService } from './businesslocation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessLocation, Business } from '../../entities/business.entity';
import { PayloadvalidationModule } from '../../shared/payloadvalidation/payloadvalidation.module';
import { ApiResponseModule } from '../../shared/response/apiResponse.module';

@Module({

  imports: [
    TypeOrmModule.forFeature([BusinessLocation,Business]),
    PayloadvalidationModule,ApiResponseModule
  ],
  controllers: [BusinesslocationController],
  providers: [BusinesslocationService],
  exports:[BusinesslocationService]
})
export class BusinesslocationModule {}
