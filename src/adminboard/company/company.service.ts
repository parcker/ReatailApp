import { Injectable, HttpException, HttpStatus, Logger} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, getRepository, DeleteResult } from 'typeorm';
import { Business } from "../../entities/business.entity";
import { CreateCompanyDto } from '../../app-Dto/usermgr/company/company.dto';
import { ResponseObj } from '../../shared/generic.response';
import { ApiResponseService } from '../../shared/response/apiResponse.service';
import { BusinesslocationService } from '../businesslocation/businesslocation.service';

@Injectable()
export class CompanyService {

    constructor(@InjectRepository(Business)private readonly buisnessRepository: Repository<Business>,
    private readonly apiResponseService: ApiResponseService, private readonly businesslocationService: BusinesslocationService) 
    {}
    async createCompany(companyDTO: CreateCompanyDto): Promise<ResponseObj<Business>> {
        try
        {  

             let model=new Business();
             model.name=companyDTO.comapanyName;
             model.address=companyDTO.address;
             model.logoPath='No Logo'
             model.isDisabled=false;
             model.createdby='';
             model.updatedby='';
            const response= await this.buisnessRepository.save(model);
            return this.apiResponseService.SuccessResponse(
                `sign up completed` ,
                HttpStatus.OK, response);
           
        }
        catch(err){return err;}
     }
     async companyStatus(companyId:string,status:boolean,updateby:string):Promise<any>{
        try{
            let response= await this.buisnessRepository.findOne({where: { id: companyId } });
            if(response)
            {
                let businesslocations=await this.businesslocationService.getbusinesslocationBusinessId(companyId);
                if(businesslocations){
                    for (let index = 0; index < businesslocations.length; index++) {
                        
                        const element = businesslocations[index];
                        await this.businesslocationService.businesslocationStatus(element.id,status,updateby);
                        
                    }
                }
                response.isDisabled=status;
                response.updatedby=updateby;
                await this.buisnessRepository.save(response);
                
                 return this.apiResponseService.SuccessResponse(
                    `Business is ${status ? 'Enabled' : 'Disabled'} and ${businesslocations.length} ${status ? 'Enabled' : 'Disabled'} `,
                    HttpStatus.OK, response);
            }
            return this.apiResponseService.FailedBadRequestResponse(
                `invalid or business Id , data found`,
                HttpStatus.BAD_REQUEST,'');
        }
        catch (error) {
            Logger.error(error);
            return new HttpException({
               message: 'Process error while executing operation:',
               code: 500, status: false
            },
               HttpStatus.INTERNAL_SERVER_ERROR);
         }
    }
}
