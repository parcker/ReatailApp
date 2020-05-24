import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../../entities/product.entity';
import { Category, SubCategory } from '../../entities/category.entity';
import { Business } from '../../entities/business.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PayloadvalidationModule } from '../../shared/payloadvalidation/payloadvalidation.module';
import { ApiResponseModule } from '../../shared/response/apiResponse.module';

@Module({

    imports: [
        TypeOrmModule.forFeature([Product,Category,SubCategory,Business]),
        PayloadvalidationModule,ApiResponseModule
    ],
    providers: [ProductService],
    controllers: [ProductController],
    exports: [ProductService]
})
export class ProductModule {}
