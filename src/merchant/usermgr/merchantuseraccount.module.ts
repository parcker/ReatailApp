import { Module } from '@nestjs/common';
import { MerchantuseraccountService } from './merchantuseraccount.service';
import { MerchantuseraccountController } from './merchantuseraccount.controller';
import { PayloadvalidationModule } from '../../shared/payloadvalidation/payloadvalidation.module';
import { ApiResponseModule } from '../../shared/response/apiResponse.module';
import { SettingsModule } from '../settings/settings.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BusinessLocation } from '../../entities/business.entity';

import { User } from '../../entities/user.entity';
import { EmailModule } from '../../shared/email/email.module';

@Module({

  imports: [
    TypeOrmModule.forFeature([User,BusinessLocation]),//
    PayloadvalidationModule,ApiResponseModule,
   SettingsModule,EmailModule
],

  providers: [MerchantuseraccountService],
  controllers: [MerchantuseraccountController],
  exports: [MerchantuseraccountService]
})
export class MerchantuseraccountModule {}
