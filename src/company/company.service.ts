import { Injectable, HttpException, HttpStatus} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, getRepository, DeleteResult } from 'typeorm';
import { Business } from '../entities/business.entity';
import { CreateCompanyDto } from '../app-Dto/usermgr/company/company.dto';
import { ResponseObj } from '../shared/genericresponse';

@Injectable()
export class CompanyService {

    constructor(@InjectRepository(Business)private readonly buisnessRepository: Repository<Business>,) 
    {}
    async createCompany(companyDTO: CreateCompanyDto): Promise<ResponseObj<string>> {
        try
        {   
             let model=new Business();
             model.name=companyDTO.comapanyName;
             model.address=companyDTO.address;
             model.dateCreated=Date.toString()

             const qb = await getRepository(Business).createQueryBuilder('business').where('business.name = :name', { name });
             const role = await qb.getOne();
             if(role){
                 const errors = {username: 'role name must be unique.'};
                 throw new HttpException({message: 'Input data validation failed', errors}, HttpStatus.BAD_REQUEST);
             }
 
             let buinessDb = this.buisnessRepository.create(model);
             let response= await this.buisnessRepository.save(buinessDb);
        }
        catch(err){return err;}
     }

}
