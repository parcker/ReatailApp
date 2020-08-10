import { Module } from '@nestjs/common';
import { RetailsaleService } from './retailsale.service';
import { RetailsaleController } from './retailsale.controller';

@Module({
  providers: [RetailsaleService],
  controllers: [RetailsaleController],
  exports:[RetailsaleService]
})
export class RetailsaleModule {}
