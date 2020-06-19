import { Module } from '@nestjs/common';
import { MerchantuseraccountService } from './merchantuseraccount.service';
import { MerchantuseraccountController } from './merchantuseraccount.controller';

@Module({
  providers: [MerchantuseraccountService],
  controllers: [MerchantuseraccountController]
})
export class MerchantuseraccountModule {}
