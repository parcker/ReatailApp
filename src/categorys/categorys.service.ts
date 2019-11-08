import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Category, SubCategory } from '../entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessLocation } from '../entities/business.entity';
import { promises } from 'fs';

@Injectable()
export class CategorysService {

    constructor(@InjectRepository(Category)private readonly categorRepository: Repository<Category>,
    @InjectRepository(SubCategory)private readonly subcategoryRepository: Repository<SubCategory>,
    @InjectRepository(BusinessLocation)private readonly businesslocationRepository: Repository<BusinessLocation>) {}

    async createRole(categoryname :string,createdby:string,businesslocationId:string): Promise<any> {
        try
        {  
             
            
        }
        catch(error)
        {
         return new HttpException({message: 'Process error while executing operation:',
          code:500, status:false},
         HttpStatus.INTERNAL_SERVER_ERROR);
        }
     }

}
