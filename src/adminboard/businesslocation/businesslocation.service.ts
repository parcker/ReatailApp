import { Injectable, HttpException, HttpStatus, Logger} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, DeleteResult } from 'typeorm';
import { Business, BusinessLocation } from "../../entities/business.entity";
import { ResponseObj } from '../../shared/generic.response';
import { IbusinessLocationDto } from '../../app-Dto/usermgr/company/company.dto';


@Injectable()
export class BusinesslocationService {

    constructor(@InjectRepository(BusinessLocation)private readonly buisnesLocationRepository: Repository<BusinessLocation>,
    @InjectRepository(Business)private readonly buisnessRepository: Repository<Business>) 
    {}
    async create(buisnessname:string,address:string,businessId:string,userId:string): Promise<any>{
       
       try
        { 
           
            const business=await this.buisnessRepository.findOne({where:{Id:businessId}});
            if (!business) {

                let result = new ResponseObj<string>();
                result.message = `invalid or business  Id , no business  data found`;
                result.status = false;
                result.result = '';
                return result;
            }
            let model=new BusinessLocation();
            model.name=buisnessname;
            model.address=address;
            model.createdby=userId;
            model.IsActive=true;
            model.updatedby='';
            model.business =business;
            model.isDisabled=false;
            let response= await this.buisnesLocationRepository.save(model);
          
            let result= new ResponseObj<BusinessLocation>();
            result.message=`Business location created` ;
            result.status=true;
            result.result=response;
            return result;


        }catch (error) {

            Logger.error(error);
            return new
                HttpException({
                    message: 'Process error while executing operation:',
                    code: 500, status: false
                },
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getbusinesslocation(): Promise<any>{
       
        try
         { 
            
             let response= await this.buisnesLocationRepository.find();
            
             let result= new ResponseObj<IbusinessLocationDto[]>();
             result.message=`Business location created` ;
             result.status=true;
             result.result=response;
             return result;
 
 
         }catch (error) {

            Logger.error(error);
            return new
                HttpException({
                    message: 'Process error while executing operation:',
                    code: 500, status: false
                },
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
     }
     async getbusinesslocationBusinessId(businessId:string): Promise<any>{
       
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
 
 
         }catch (error) {

            Logger.error(error);
            return new
                HttpException({
                    message: 'Process error while executing operation:',
                    code: 500, status: false
                },
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
     }
    
    
}
