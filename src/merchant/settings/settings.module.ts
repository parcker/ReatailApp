import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Business } from '../../entities/business.entity';
import { PayloadvalidationModule } from '../../shared/payloadvalidation/payloadvalidation.module';
import { ApiResponseModule } from '../../shared/response/apiResponse.module';
import { FiscalYear } from '../../entities/fiscalyear.entity';
import { PaymentMode } from '../../entities/paymentmode.entity';
import { PaymentTerm } from '../../entities/paymentterm.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Business,FiscalYear,PaymentMode,PaymentTerm]),
    PayloadvalidationModule,ApiResponseModule
],
  providers: [SettingsService],
  controllers: [SettingsController],
  exports:[SettingsService]
})
export class SettingsModule {}
