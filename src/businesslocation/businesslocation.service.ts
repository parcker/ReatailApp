import { Injectable, HttpException, HttpStatus} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, DeleteResult } from 'typeorm';
import { Business, BusinessLocation } from "../entities/business.entity";
import { ResponseObj } from '../shared/generic.response';
import { IbusinessLocationDto } from '../app-Dto/usermgr/company/company.dto';


@Injectable()
export class BusinesslocationService {

    constructor(@InjectRepository(BusinessLocation)private readonly buisnesLocationRepository: Repository<BusinessLocation>,
    @InjectRepository(Business)private readonly buisnessRepository: Repository<Business>) 
    {}
    async create(buisnessname:string,address:string,businessId:string,userId:string): Promise<ResponseObj<BusinessLocation>>{
       
       try
        { 
            console.log('Data sent',buisnessname,address,businessId);
            const business=await this.buisnessRepository.findOne({where:{Id:businessId}});
            let model=new BusinessLocation();
            model.name=buisnessname;
            model.address=address;
            model.createdby=userId;
            model.IsActive=true;
            model.updatedby='';

            const businesslocation=await this.buisnesLocationRepository.create({...model,business})
            
            
            let response= await this.buisnesLocationRepository.save(businesslocation);
            console.log(response);
            let result= new ResponseObj<BusinessLocation>();
            result.message=`Business location created` ;
            result.status=true;
            result.result=response;

            console.log(result);
            
            return result;


        }catch(error){console.log(error)}
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
