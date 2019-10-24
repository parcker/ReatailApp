import { Injectable, HttpException, HttpStatus} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, getRepository, DeleteResult } from 'typeorm';
import { Business } from "../entities/business.entity";
import { CreateCompanyDto } from '../app-Dto/usermgr/company/company.dto';
import { ResponseObj } from '../shared/generic.response';

@Injectable()
export class CompanyService {

    constructor(@InjectRepository(Business)private readonly buisnessRepository: Repository<Business>,) 
    {}
    async createCompany(companyDTO: CreateCompanyDto): Promise<ResponseObj<Business>> {
        try
        {  

             let model=new Business();
             model.name=companyDTO.comapanyName;
             model.address=companyDTO.address;
             model.IsActive=false;
             model.logoPath='No Logo'
             model.isDisabled=false;
             model.createdby='';
             model.updatedby='';
            const response= await this.buisnessRepository.save(model);
             
            let result= new ResponseObj<Business>();
            result.message=`sign up completed` ;
            result.status=true;
            result.result=response;
            return result;
        }
        catch(err){return err;}
     }

}
