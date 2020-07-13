import { Injectable, HttpException, HttpStatus, Logger} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Business, BusinessLocation } from "../../entities/business.entity";
import { ApiResponseService } from '../../shared/response/apiResponse.service';


@Injectable()
export class BusinesslocationService {

    constructor(@InjectRepository(BusinessLocation)private readonly buisnesLocationRepository: Repository<BusinessLocation>,
    @InjectRepository(Business)private readonly buisnessRepository: Repository<Business>,
    private readonly apiResponseService: ApiResponseService) 
    {}
    async create(buisnesslocationname:string,address:string,businessId:string,userId:string): Promise<any>{
       
       try
        { 
            console.log('Inside BusinesslocationService ID==>',businessId);
            let business=await this.buisnessRepository.findOneOrFail({where:{id:businessId}});
            if (!business) {

                return this.apiResponseService.FailedBadRequestResponse(
                    `invalid or business  Id , no business  data found`,
                    HttpStatus.BAD_REQUEST,'');
               
            }
            console.log('Inside BusinesslocationService ==>',business);
            let model=new BusinessLocation();
            model.name=buisnesslocationname;
            model.address=address;
            model.createdby=userId;
            model.updatedby='';
            model.business =business;
            model.isDisabled=true;
            let response= await this.buisnesLocationRepository.save(model);
            return this.apiResponseService.SuccessResponse(
                `${buisnesslocationname} Business location created`,
                HttpStatus.OK, response);
           


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
    async getbusinesslocation(status:boolean): Promise<any>{
       
        try
         { 
            
             let response= await this.buisnesLocationRepository.find({where:{isDisabled:status}});
             return this.apiResponseService.SuccessResponse(
                `${response.length} Business location data`,
                HttpStatus.OK, response);
       
 
 
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
    async getbusinesslocationBusinessId(businessId:string,status:boolean): Promise<any>{
       
        try
         { 
            
             let response= await this.buisnesLocationRepository.find({ where: { businessId: businessId,isDisabled:status},order: { name: 'ASC' }});
             return this.apiResponseService.SuccessResponse(
                `${response.length} Business location data`,
                HttpStatus.OK, response);
           
 
 
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
    async businesslocationStatus(businesslocationId:string,status:boolean,updatedby:string):Promise<any>{
        try{
            let response= await this.buisnesLocationRepository.findOne({where: { id: businesslocationId } });
            if(response){
                response.isDisabled=status;
                response.updatedby=updatedby;
                 await this.buisnesLocationRepository.save(response);
                 return this.apiResponseService.SuccessResponse(
                    `Business location is ${status ? 'Enabled' : 'Disabled'}`,
                    HttpStatus.OK, response);
            }
            return this.apiResponseService.FailedBadRequestResponse(
                `invalid or business location Id  Id , data found`,
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
