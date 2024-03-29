import { Module } from '@nestjs/common';
import { Role, RoleUser } from '../../entities/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { User } from '../../entities/user.entity';
import { Business } from '../../entities/business.entity';
import { ApiResponseModule } from '../../shared/response/apiResponse.module';
import { PayloadvalidationModule } from '../../shared/payloadvalidation/payloadvalidation.module';
@Module({
    imports: [
        TypeOrmModule.forFeature([Role,RoleUser,User,Business]),
        ApiResponseModule,
        PayloadvalidationModule
    ],
    providers: [RolesService],
    controllers: [RolesController],
    exports: [RolesService]

})
export class RolesModule {


}
