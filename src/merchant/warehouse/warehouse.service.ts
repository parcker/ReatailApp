import { Injectable, HttpStatus, Logger, HttpException } from '@nestjs/common';
import { BusinessLocation, Business } from '../../entities/business.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { PayloadvalidationService } from '../../shared/payloadvalidation/payloadvalidation.service';
import { ApiResponseService } from '../../shared/response/apiResponse.service';
import { CreatWarehouseDto, UpdateWarehouseDto } from '../../app-Dto/merchant/warehouse.dto';
import { Warehouse } from '../../entities/warehouse.entity';
import { StoreProduct } from '../../entities/storeproduct.entity';
import { UpdateCategoryDto } from '../../app-Dto/merchant/category.dto';
import { request } from 'http';

@Injectable()
export class WarehouseService {

    constructor(@InjectRepository(Business) private readonly businessRepository: Repository<Business>,
    @InjectRepository(BusinessLocation) private readonly businesslocationRepository: Repository<BusinessLocation>,
    @InjectRepository(Warehouse) private readonly warehouseRepository: Repository<Warehouse>,
    @InjectRepository(StoreProduct) private readonly storeproductRepository: Repository<StoreProduct>,
    private readonly payloadService: PayloadvalidationService,
    private readonly apiResponseService: ApiResponseService) {}

     async create(resquest:CreatWarehouseDto,createdby:string): Promise<any>{
       
        try
         { 
            var validation=await this.payloadService.validateCreateWarehouseAsync(resquest);
            if(validation.IsValid){

                let business=await this.businesslocationRepository.findOneOrFail({where:{id:resquest.businesslocationId}});
                if (!business) {
    
                    return this.apiResponseService.FailedBadRequestResponse(
                        `invalid business location  data found`,
                        HttpStatus.BAD_REQUEST,'');
                    
                }
                let model=new Warehouse();
                model.name=resquest.name;
                model.address=resquest.address;
                model.createdby=createdby;
                model.updatedby='';
                model.businesslocation =business;
                model.isDisabled=false;
                let response= await this.warehouseRepository.save(model);
                return this.apiResponseService.SuccessResponse(
                    `${model.name}  created under ${business.name}`,
                    HttpStatus.OK, response);
               
            }
            return await this.payloadService.badRequestErrorMessage(validation.Errors);
           
         }catch (error) {
 
             console.error('create warehouse',error);
             return new
                 HttpException({
                     message: 'Process error while executing operation:',
                     code: 500, status: false
                 },
                     HttpStatus.INTERNAL_SERVER_ERROR);
         }
     }
     async update(resquest:UpdateWarehouseDto,warehouseId:string,updatedby:string): Promise<any>{
       
        try
        { 
            var validation=await this.payloadService.validateUpdateWarehouseAsync(resquest);
            if(validation.IsValid)
            {
                let warehouse=await this.warehouseRepository.findOneOrFail({where:{id:warehouseId}});
                if (!warehouse) {
    
                    return this.apiResponseService.FailedBadRequestResponse(
                        `invalid warehouse id, no  data found`,
                        HttpStatus.BAD_REQUEST,'');
                    
                }
                let business=await this.businesslocationRepository.findOneOrFail({where:{id:resquest.businesslocationId}});
                if (!business) {
    
                    return this.apiResponseService.FailedBadRequestResponse(
                        `invalid business location  data found`,
                        HttpStatus.BAD_REQUEST,'');
                    
                }
                warehouse.name=resquest.name;
                warehouse.address=resquest.address;
                warehouse.updatedby=updatedby;
                warehouse.businesslocation =business;
                warehouse.isDisabled=resquest.isDisable;
                let response= await this.warehouseRepository.save(warehouse);
                

                return this.apiResponseService.SuccessResponse(
                    `${warehouse.name}  updated under ${business.name}`,
                    HttpStatus.OK, response);
               
            }
            return await this.payloadService.badRequestErrorMessage(validation.Errors);
           
         }catch (error) {
 
             console.error('update warehouse',error);
             return new
                 HttpException({
                     message: 'Process error while executing operation:',
                     code: 500, status: false
                 },
                     HttpStatus.INTERNAL_SERVER_ERROR);
         }
     }
     async getwarehouse(status:boolean): Promise<any>{
        
         try
          { 
             
            let response= await this.warehouseRepository.find({where:{isDisabled:status}});
              return this.apiResponseService.SuccessResponse(
                 `${response.length} Warehouse data`,
                 HttpStatus.OK, response);
        
          }catch (error) {
 
            console.error('getwarehouse',error);
             return new
                 HttpException({
                     message: 'Process error while executing operation:',
                     code: 500, status: false
                 },
                    HttpStatus.INTERNAL_SERVER_ERROR);
         }
     }
     async getWarehouseByBusinesslocationId(businessLocation:BusinessLocation,business:Business,status:boolean): Promise<any>{
        
         try
          { 
             
            if(businessLocation!==null )
            {
                 let response= await this.warehouseRepository.find({ where: 
                    { businesslocation:businessLocation,isDisabled:status},order: { name: 'ASC' }});
                return this.apiResponseService.SuccessResponse(
                   `${response.length} Warehouse data`,
                   HttpStatus.OK, response);
            }
            else
            {
                const businesslocation= await this.businesslocationRepository.find({where:{business:business}});//.map(a => a.foo);
                const businesslocationIds =businesslocation.map(c=>c.id);
                if(businesslocationIds.length)
                {
                    const data =  await this.warehouseRepository.createQueryBuilder("warehouse")
                    .where("warehouse.businesslocation.id IN (:...id)", { id:businesslocationIds})
                    .andWhere("warehouse.isDisabled = :isDisabled",{isDisabled:status})
                    .orderBy("warehouse.name")
                    .getMany();

                    return this.apiResponseService.SuccessResponse(
                        `Warehouse data`,
                        HttpStatus.OK, data);
                }else{

                    
                    return this.apiResponseService.SuccessResponse(
                        `${businesslocation.length} Warehouse data , no business location configured`,
                        HttpStatus.OK, businesslocation);

                }
            }
            
  
          }catch (error) {
 
            console.error('getWarehouseByBusinesslocationId',error);
             return new
                 HttpException({
                     message: 'Process error while executing operation:',
                     code: 500, status: false
                 },
                     HttpStatus.INTERNAL_SERVER_ERROR);
         }
     }
     async changeWarehouseStatus(warehouseId:string,status:boolean,updatedby:string):Promise<any>{
         try{
             let response= await this.warehouseRepository.findOne({where: { id: warehouseId } });
             if(response){
                 response.isDisabled=status;
                 response.updatedby=updatedby;
                  await this.warehouseRepository.save(response);
                  return this.apiResponseService.SuccessResponse(
                     `warehouse is ${status ? 'Enabled' : 'Disabled'}`,
                     HttpStatus.OK, response);
             }
             return this.apiResponseService.FailedBadRequestResponse(
                 `invalid or warehouse Id , data found`,
                 HttpStatus.BAD_REQUEST,'');
         }
         catch (error) {
            console.error('changeWarehouseStatus',error);
             return new HttpException({
                message: 'Process error while executing operation:',
                code: 500, status: false
             },
                HttpStatus.INTERNAL_SERVER_ERROR);
          }
     }
     async deleteWarehouse(warehouseId:string):Promise<any>{
        try{
            let response= await this.warehouseRepository.findOne({where: { id: warehouseId } });
            if(!response){

                return this.apiResponseService.FailedBadRequestResponse(
                    `invalid or warehouse Id , data found`,
                    HttpStatus.BAD_REQUEST,'');
            }
            var checkforStatus=await this.storeproductRepository.findOne({where:{warehouse:response}});
            if(!checkforStatus){

                await this.warehouseRepository.remove(response);
                 return this.apiResponseService.SuccessResponse(
                    `${response.name}`,
                    HttpStatus.OK, response);
            }
            return this.apiResponseService.FailedBadRequestResponse(
                `warehouse is in use , cannot be deleted`,
                HttpStatus.BAD_REQUEST,'');
                
        }
        catch (error) {
           console.error('changeWarehouseStatus',error);
            return new HttpException({
               message: 'Process error while executing operation:',
               code: 500, status: false
            },
               HttpStatus.INTERNAL_SERVER_ERROR);
         }
    }
     

}
