import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role, RoleUser } from '../../entities/role.entity';
import { User } from '../../entities/user.entity';
import { Business, BusinessLocation } from '../../entities/business.entity';
import { ApiResponseModule } from '../../shared/response/apiResponse.module';
import { PayloadvalidationModule } from '../../shared/payloadvalidation/payloadvalidation.module';
import { RolesService } from '../roles/roles.service';
import { RolesController } from '../roles/roles.controller';
import { WarehouseService } from './warehouse.service';
import { WarehouseController } from './warehouse.controller';
import { Warehouse } from '../../entities/warehouse.entity';
import { StoreProduct } from '../../entities/storeproduct.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([BusinessLocation,Warehouse,StoreProduct,Business]),
        ApiResponseModule,
        PayloadvalidationModule
    ],
    providers: [WarehouseService],
    controllers: [WarehouseController],
    exports: [WarehouseService]

})
export class WarehouseModule {}
