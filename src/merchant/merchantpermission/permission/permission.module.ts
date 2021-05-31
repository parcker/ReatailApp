import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Business } from '../../../entities/business.entity';
import { MerchantPermission, MerchantRoleUser, MerchantRole, MerchantModule } from '../../../entities/merchantpermission.entity';
import { User } from '../../../entities/user.entity';
import { PayloadvalidationModule } from '../../../shared/payloadvalidation/payloadvalidation.module';
import { ApiResponseModule } from '../../../shared/response/apiResponse.module';
import { PermissionController } from './permission.controller';
import { MerchantUserPermissionService } from './permission.service';

@Module({
  
  imports: [
    TypeOrmModule.forFeature([Business,MerchantPermission,MerchantRoleUser,MerchantRole,MerchantModule,User]),
    PayloadvalidationModule,
    ApiResponseModule
  ],
  controllers: [PermissionController],
  providers: [MerchantUserPermissionService],
  exports:[MerchantUserPermissionService]

})
export class PermissionModule {}

