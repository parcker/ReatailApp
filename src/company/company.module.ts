import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Business } from '../entities/business.entity';

@Module({
    providers: [CompanyService],
    controllers: [CompanyController],
    imports: [
        TypeOrmModule.forFeature([Business]),
       
    ],
    exports: [CompanyService]
})
export class CompanyModule {}
