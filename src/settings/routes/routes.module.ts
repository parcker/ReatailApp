import { Module } from '@nestjs/common';
import { RoutesController } from './routes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationRoute } from '../../entities/role.entity';
import { RoutesService } from './routes.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ApplicationRoute])
  ],
  controllers: [RoutesController],
  providers: [RoutesService],
  exports:[RoutesService]
})
export class RoutesModule {}
