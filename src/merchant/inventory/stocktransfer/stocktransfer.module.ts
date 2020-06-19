import { Module } from '@nestjs/common';
import { StocktransferService } from './stocktransfer.service';
import { StocktransferController } from './stocktransfer.controller';

@Module({
  providers: [StocktransferService],
  controllers: [StocktransferController]
})
export class StocktransferModule {}
