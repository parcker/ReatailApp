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
    async createCompany(companyDTO: CreateCompanyDto): Promise<ResponseObj<Business>> {
        try
        {   console.log("Company.service 1", companyDTO)
             let model=new Business();
             model['name']=companyDTO.comapanyName;
             model.address=companyDTO.address;
             model.dateCreated=Date.toString()

             
             let buinessDb = this.buisnessRepository.create(model);
             const response= await this.buisnessRepository.save(buinessDb);
             
            let result= new ResponseObj<Business>();
            result.message=`sign up completed` ;
            result.status=true;
            result.result=response;
            return result;
        }
        catch(err){return err;}
     }

}
