import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { Category, SubCategory } from '../entities/category.entity';
import { Business } from '../entities/business.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({

    imports: [
        TypeOrmModule.forFeature([Product,Category,SubCategory,Business])
    ],
    providers: [ProductService],
    controllers: [ProductController],
    exports: [ProductService]
})
export class ProductModule {}
