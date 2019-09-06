import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { CompanyService } from '../company/company.service';
import { UsersService } from '../users/users.service';

@Module({
  controllers: [AccountController],
  providers: [AccountService,UsersService,CompanyService]
  
})
export class AccountModule {}
