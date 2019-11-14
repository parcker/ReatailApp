import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategorysController } from './categorys.controller';
import { CategorysService } from './categorys.service';
import { Category, SubCategory } from '../entities/category.entity';
import { Business } from '../entities/business.entity';

@Module({

    imports: [
        TypeOrmModule.forFeature([Category,SubCategory,Business])
      ],
      controllers: [CategorysController],
      providers: [CategorysService],
      exports:[CategorysService]

})
export class CategorysModule {}
