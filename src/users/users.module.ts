import { Module, NestModule, forwardRef } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailModule } from '../shared/email/email.module';
import { Business } from '../entities/business.entity';
import { RoleUser, Role } from '../entities/role.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([User,Business,RoleUser,Role]),
        EmailModule
    ],
    providers: [UsersService,],
    controllers: [UsersController],
    exports: [UsersService]
})
export class UsersModule { }
