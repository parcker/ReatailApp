import { forwardRef, Module, RequestMethod } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { IsAuthenticated } from './auth.middleware';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './passport/jwt.strategy';
import { User } from '../entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Business } from '../entities/business.entity';
import { UserPremission } from '../entities/role.entity';
import { PayloadvalidationModule } from '../shared/payloadvalidation/payloadvalidation.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([User,Business,UserPremission]),
        UsersModule,
        PayloadvalidationModule
    ],
    providers: [AuthService, IsAuthenticated, JwtStrategy],
    controllers: [AuthController],
    exports: [IsAuthenticated]
})
export class AuthModule { }
