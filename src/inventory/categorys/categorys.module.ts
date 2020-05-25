import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategorysController } from './categorys.controller';
import { CategorysService } from './categorys.service';
import { Category, SubCategory } from '../../entities/category.entity';
import { Business } from '../../entities/business.entity';
import { PayloadvalidationModule } from '../../shared/payloadvalidation/payloadvalidation.module';
import { Product } from '../../entities/product.entity';
import { ApiResponseModule } from '../../shared/response/apiResponse.module';

@Module({

    imports: [
        TypeOrmModule.forFeature([Category,SubCategory,Product,Business]),
        PayloadvalidationModule,
        ApiResponseModule
      ],
      controllers: [CategorysController],
      providers: [CategorysService],
      exports:[CategorysService]

})
export class CategorysModule {}
