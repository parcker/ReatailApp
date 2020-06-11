import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { UsersModule } from '../users/users.module';
import { CompanyModule } from '../adminboard/company/company.module';
import { EmailModule } from '../shared/email/email.module';
import { PayloadvalidationModule } from '../shared/payloadvalidation/payloadvalidation.module';
import { ApiResponseModule } from '../shared/response/apiResponse.module';
import { BusinesslocationModule } from '../adminboard/businesslocation/businesslocation.module';

@Module({
  controllers: [AccountController],
  providers: [AccountService],
  imports: [UsersModule,CompanyModule,EmailModule,PayloadvalidationModule,ApiResponseModule,BusinesslocationModule]
})
export class AccountModule {}
