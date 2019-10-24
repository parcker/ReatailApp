import { Module } from '@nestjs/common';
import { BusinesslocationController } from './businesslocation.controller';
import { BusinesslocationService } from './businesslocation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessLocation, Business } from '../entities/business.entity';

@Module({

  imports: [
    TypeOrmModule.forFeature([BusinessLocation,Business])
  ],
  controllers: [BusinesslocationController],
  providers: [BusinesslocationService],
  exports:[BusinesslocationService]
})
export class BusinesslocationModule {}
