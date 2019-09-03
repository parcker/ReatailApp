import { Module } from '@nestjs/common';
import { Role } from '../entities/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
@Module({
    imports: [
        TypeOrmModule.forFeature([Role])
    ],
    providers: [RolesService],
    controllers: [RolesController],
    exports: [RolesService]

})
export class RolesModule {


}
