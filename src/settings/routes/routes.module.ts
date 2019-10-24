import { Module } from '@nestjs/common';
import { RoutesController } from './routes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationRoute, UserPremission } from '../../entities/role.entity';
import { RoutesService } from './routes.service';
import { User } from '../../entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ApplicationRoute,User,UserPremission])
  ],
  controllers: [RoutesController],
  providers: [RoutesService],
  exports:[RoutesService]
})
export class RoutesModule {}
