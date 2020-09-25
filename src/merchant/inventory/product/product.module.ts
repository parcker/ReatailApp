import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product} from '../../../entities/product.entity';
import { Category, SubCategory } from '../../../entities/category.entity';
import { Business } from '../../../entities/business.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PayloadvalidationModule } from '../../../shared/payloadvalidation/payloadvalidation.module';
import { ApiResponseModule } from '../../../shared/response/apiResponse.module';
import { ProductConfiguration } from '../../../entities/productconfiguration.entity';
import { StoreProduct } from '../../../entities/storeproduct.entity';
import { Tax } from '../../../entities/tax.entity';1
import { Warehouse } from '../../../entities/warehouse.entity';
import { StockCard } from '../../../entities/stockcard.entity';
import { PriceConfiguration } from '../../../entities/priceconfiguration.entity';

@Module({

    imports: [
        TypeOrmModule.forFeature([Product,Category,SubCategory,Business,ProductConfiguration,PriceConfiguration,StoreProduct,Tax,Warehouse,StoreProduct,StockCard]),
        PayloadvalidationModule,ApiResponseModule
    ],
    providers: [ProductService],
    controllers: [ProductController],
    exports: [ProductService]
})
export class ProductModule {}
