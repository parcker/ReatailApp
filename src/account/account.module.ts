import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { UsersModule } from '../users/users.module';
import { CompanyModule } from '../company/company.module';

@Module({
  controllers: [AccountController],
  providers: [AccountService],
  imports: [UsersModule,CompanyModule]
})
export class AccountModule {}
