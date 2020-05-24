import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Business } from '../../entities/business.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseObj } from '../generic.response';

@Injectable()
export class UtilityService {
    
    constructor(@InjectRepository(Business)private readonly businessRepository: Repository<Business>) {
       
    }
    async validateBusinessInfo(id:string):Promise<any>{
        try{

            let getbusinessInfo=await this.businessRepository.findOne({where:{id:id,isDisabled:false}});
                if(!getbusinessInfo){
                   
                   let result= new ResponseObj<any>();
                   result.message=`invalid or business  Id , no business  data found`;
                   result.status=false;
                   result.code=HttpStatus.BAD_REQUEST;
                   result.result='';
                   return result;
                }
            return getbusinessInfo;
        }
        catch(error)
        {
            console.log('Error Message',error,Date.now())
            Logger.error(error);
            return new 
            HttpException({message: 'Process error while executing operation:', status:false},
            HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
