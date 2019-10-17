import { Module } from '@nestjs/common';
import { BusinesslocationController } from './businesslocation.controller';
import { BusinesslocationService } from './businesslocation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessLocation } from '../entities/business.entity';

@Module({

  imports: [
    TypeOrmModule.forFeature([BusinessLocation])
  ],
  controllers: [BusinesslocationController],
  providers: [BusinesslocationService],
  exports:[BusinesslocationService]
})
export class BusinesslocationModule {}
