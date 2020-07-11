import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

import { CompanyModule } from '../adminboard/company/company.module';
import { EmailModule } from '../shared/email/email.module';
import { PayloadvalidationModule } from '../shared/payloadvalidation/payloadvalidation.module';
import { ApiResponseModule } from '../shared/response/apiResponse.module';
import { BusinesslocationModule } from '../adminboard/businesslocation/businesslocation.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { BusinessLocation } from '../entities/business.entity';

@Module({
  controllers: [AccountController],
  providers: [AccountService],
  imports: [TypeOrmModule.forFeature([User]),
    CompanyModule,EmailModule,PayloadvalidationModule,ApiResponseModule,BusinesslocationModule]
})
export class AccountModule {}
