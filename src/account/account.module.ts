import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { UsersModule } from '../users/users.module';
import { CompanyModule } from '../company/company.module';
import { EmailModule } from '../shared/email/email.module';
import { PayloadvalidationModule } from '../shared/payloadvalidation/payloadvalidation.module';

@Module({
  controllers: [AccountController],
  providers: [AccountService],
  imports: [UsersModule,CompanyModule,EmailModule,PayloadvalidationModule]
})
export class AccountModule {}
