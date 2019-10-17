import { Injectable, HttpException, HttpStatus} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, DeleteResult } from 'typeorm';
import { Business, BusinessLocation } from "../entities/business.entity";
import { ResponseObj } from '../shared/generic.response';
import { IbusinessLocationDto } from '../app-Dto/usermgr/company/company.dto';


@Injectable()
export class BusinesslocationService {

    constructor(@InjectRepository(BusinessLocation)private readonly buisnesLocationRepository: Repository<BusinessLocation>,) 
    {}
    async create(buisnessname:string,address:string,businessId:string,userId:string): Promise<ResponseObj<BusinessLocation>>{
       
       try
        { 
            let model=new BusinessLocation();
            model.name=buisnessname;
            model.address=address;
            model.createdby=userId;
            model.business.id=businessId;

            let response= await this.buisnesLocationRepository.save(model);
           
            let result= new ResponseObj<BusinessLocation>();
            result.message=`Business location created` ;
            result.status=true;
            result.result=response;
            return result;


        }catch(error){}
    }
    async getbusinesslocation(): Promise<ResponseObj<IbusinessLocationDto[]>>{
       
        try
         { 
            
             let response= await this.buisnesLocationRepository.find();
            
             let result= new ResponseObj<IbusinessLocationDto[]>();
             result.message=`Business location created` ;
             result.status=true;
             result.result=response;
             return result;
 
 
         }catch(error){}
     }
     async getbusinesslocationBusinessId(businessId:string): Promise<ResponseObj<BusinessLocation[]>>{
       
        try
         { 
            
             let response= await this.buisnesLocationRepository.find({ where: { businessId: businessId},order: { name: 'ASC' }});
             for(var i = 0; i < response.length; i++)
             { 
                console.log(response[i]); // output: Apple Orange Banana
             }
             let result= new ResponseObj<BusinessLocation[]>();
             result.message=`Business location created` ;
             result.status=true;
             result.result=response;
             return result;
 
 
         }catch(error){}
     }
    
    
}
