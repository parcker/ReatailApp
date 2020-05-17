import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Category, SubCategory } from '../entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Business } from '../entities/business.entity';
import { ResponseObj } from '../shared/generic.response';
import { PayloadvalidationService } from '../shared/payloadvalidation/payloadvalidation.service';

@Injectable()
export class CategorysService {
  

    constructor(@InjectRepository(Category)private readonly categorRepository: Repository<Category>,
    @InjectRepository(SubCategory)private readonly subcategoryRepository: Repository<SubCategory>,
    @InjectRepository(Business)private readonly businessRepository: Repository<Business>,
    private readonly payloadService: PayloadvalidationService) {}
    async createCategory(categoryname :string,createdby:string,businessId:string): Promise<any> {
        try
        {  
            let validationResult = await this.payloadService.validateCatgoryAsync({name:categoryname});
            if(validationResult.IsValid)
            {
                let getbusinessInfo=await this.businessRepository.findOne({where:{id:businessId,isDisabled:false}});
                if(!getbusinessInfo){
                   
                   let result= new ResponseObj<any>();
                   result.message=`invalid or business  Id , no business  data found`;
                   result.status=false;
                   result.code=409;
                   result.result='';
                   return result;
                }
                let checkduplicate=await this.categorRepository.findOne({where:{name:categoryname}});
           
                if(checkduplicate)
                {
                  
                   let result= new ResponseObj<any>();
                   result.message=`duplicate category name found ${categoryname}`;
                   result.status=false;
                   result.code=409;
                   result.result='';
                   return result;
                }
                const model=new Category();
                model.business=getbusinessInfo;
                model.name=categoryname.trim();
                model.createdby=createdby;
                model.updatedby='',
                model.isDisabled=false
                
                const dbresponse=await this.categorRepository.save(model);
               let result= new ResponseObj<Category>();
               result.message=`${dbresponse.name} has been created and activated` ;
               result.status=true;
               result.code=200;
               result.result=dbresponse;
               return result;

            }
            return await this.payloadService.badRequestErrorMessage(validationResult);
           
        }
        catch(error)
        {
            console.log('Error Message',error,Date.now())
            Logger.error(error);
            return new 
            HttpException({message: 'Process error while executing operation:',
            code:500, status:false},
            HttpStatus.INTERNAL_SERVER_ERROR);
        }
     }
    async deleteCategory(categoryId :string,createdby:string,businessId:string): Promise<any>{

        try{
            const dbcategory=await this.categorRepository.findOne({where:{id:categoryId.trim(),business:{id:businessId},isDisabled:false}});
            if(!dbcategory){
               
                let result= new ResponseObj<string>();
                result.message=`No category match found`;
                result.status=false;
                result.result='';
                return result;
            }
            ////TODO check if attched to products 

            dbcategory.isDisabled=true;
            dbcategory.updatedby=createdby
            const dbresponse=await this.categorRepository.save(dbcategory);
            let result= new ResponseObj<Category>();
            result.message=`${dbresponse.name} has been diabled` ;
            result.status=true;
            result.result=dbresponse;
            return result;
        }
        catch(error)
        {
            console.log('Error Message',error,Date.now())
            return new 
           HttpException({message: 'Process error while executing operation:',
           code:500, status:false},
           HttpStatus.INTERNAL_SERVER_ERROR);
        }

     }
    async updateCategory(categoryId :string,categoryname:string,updatedby:string,businessId:string): Promise<any>{

        try{

            let validationResult = await this.payloadService.validateCatgoryAsync({name:categoryname});
            if(validationResult.IsValid){
                let getbusinessInfo=await this.businessRepository.findOne({where:{id:businessId,isDisabled:false}});
                if(!getbusinessInfo){
                   
                   let result= new ResponseObj<string>();
                   result.message=`invalid or business  Id , no business  data found`;
                   result.status=false;
                   result.result='';
                   return result;
                }
   
               const dbcategory=await this.categorRepository.findOne({where:{id:categoryId.trim(),business:{id:businessId},isDisabled:false}});
               if(!dbcategory){
                  
                   let result= new ResponseObj<string>();
                   result.message=`No category match found`;
                   result.status=false;
                   result.result='';
                   return result;
               }
               dbcategory.name=categoryname.trim();
               dbcategory.updatedby=updatedby;
               const dbresponse=await this.categorRepository.save(dbcategory);
               let result= new ResponseObj<Category>();
               result.message=`${dbresponse.name} has been updated` ;
               result.status=true;
               result.result=dbresponse;
               return result;
            }
            return await this.payloadService.badRequestErrorMessage(validationResult);
          
        }
        catch(error)
        {
            console.log('Error Message',error,Date.now())
            Logger.error(error);
            return new 
            HttpException({message: 'Process error while executing operation:',
            code:500, status:false},
            HttpStatus.INTERNAL_SERVER_ERROR);
        }

     }

    async getcategory(businessId:string):Promise<any>{
        try{
            let getbusinessInfo=await this.businessRepository.findOne({where:{id:businessId,isDisabled:false}});
            if(!getbusinessInfo){
               
               let result= new ResponseObj<string>();
               result.message=`invalid or business  Id , no business  data found`;
               result.status=false;
               result.result='';
               return result;
            }
     
            const [dbcategory,count]=await this.categorRepository.findAndCount({where:{business:getbusinessInfo,isDisabled:false},relations: ["subcategory"]});
           
            let result= new ResponseObj<Category[]>();
            result.message=`Total of ${count} category found ` ;
            result.status=true;
            result.result=dbcategory;
     
            return result;
        }
        catch(error)
        {
            console.log('Error Message',error,Date.now())
            return new 
           HttpException({message: 'Process error while executing operation:',
           code:500, status:false},
           HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    async createSubCategory(subname:string,categoryId:string,createdby:string,businessId:string): Promise<any> {
        try
        {  
             let getbusinessInfo=await this.businessRepository.findOne({where:{id:businessId,isDisabled:false}});
             if(!getbusinessInfo){
                
                let result= new ResponseObj<string>();
                result.message=`invalid or business  Id , no business  data found`;
                result.status=false;
                result.result='';
                return result;
             }
             let getcategoryInfo=await this.categorRepository.findOne({where:{id:categoryId,isDisabled:false}});
             if(!getcategoryInfo){
                
                let result= new ResponseObj<string>();
                result.message=`invalid or category  Id , no category  data found`;
                result.status=false;
                result.result='';
                return result;
             }
             if(await this.subcategoryRepository.findOne({where:{name:subname.trim(),category:getcategoryInfo,businesslocation:getbusinessInfo,isDisabled:false}})){
               
                let result= new ResponseObj<string>();
                result.message=`duplicate sub-category name found ${subname}`;
                result.status=false;
                result.result='';
                return result;
             }

             const model=new SubCategory();
             model.business=getbusinessInfo;
             model.name=subname.trim().toLocaleLowerCase();
             model.createdby=createdby;
             model.category=getcategoryInfo;
             model.updatedby='',
             model.isDisabled=false
             
             const dbresponse=await this.subcategoryRepository.save(model);
             let result= new ResponseObj<SubCategory>();
            result.message=`${dbresponse.name} has been created and activated` ;
            result.status=true;
            result.result=dbresponse;
            return result;
            
        }
        catch(error)
        {
            console.log('Error Message',error,Date.now())
            return new 
           HttpException({message: 'Process error while executing operation:',
           code:500, status:false},
           HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteSubCategory(Id :string,actionby:string,businessId:string): Promise<any>{

        try{
            const dbsubcategory=await this.subcategoryRepository.findOne({where:{id:Id.trim(),business:{id:businessId},isDisabled:false}});
            if(!dbsubcategory){
               
                let result= new ResponseObj<string>();
                result.message=`No Subcategory match found`;
                result.status=false;
                result.result='';
                return result;
            }
            ////TODO check if attched to products 

            dbsubcategory.isDisabled=true;
            dbsubcategory.updatedby=actionby
            const dbresponse=await this.subcategoryRepository.save(dbsubcategory);
            let result= new ResponseObj<SubCategory>();
            result.message=`${dbresponse.name} has been diabled` ;
            result.status=true;
            result.result=dbresponse;
            return result;
        }
        catch(error)
        {
            console.log('Error Message',error,Date.now())
            return new 
           HttpException({message: 'Process error while executing operation:',
           code:500, status:false},
           HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    async updateSubCategory(Id :string,subcategoryname:string,updatedby:string,businessId:string,categoryId:string): Promise<any>{

        try{

            let validationResult = await this.payloadService.validateSubCatgoryAsync(
                {name:subcategoryname,categoryId:categoryId}
            );
            if(validationResult.IsValid)
            {
                let getbusinessInfo=await this.businessRepository.findOne({where:{id:businessId,isDisabled:false}});
                if(!getbusinessInfo){
                   
                   let result= new ResponseObj<string>();
                   result.message=`invalid or business  Id , no business  data found`;
                   result.status=false;
                   result.result='';
                   return result;
                }
   
               let dbSubcategory=await this.subcategoryRepository.findOne({where:{id:Id.trim(),business:getbusinessInfo,isDisabled:false}});
               if(!dbSubcategory){
                  
                   let result= new ResponseObj<string>();
                   result.message=`No Subcategory match found`;
                   result.status=false;
                   result.result='';
                   return result;
               }
               let oldername=dbSubcategory.name;
   
               let category=await this.categorRepository.findOne({where:{id:categoryId}});
               if(!category){
                  
                   let result= new ResponseObj<string>();
                   result.message=`No category match found`;
                   result.status=false;
                   result.code=409;
                   result.result='';
                   return result;
               }
            
             
               dbSubcategory.category=category;
               dbSubcategory.name=subcategoryname.trim();
               dbSubcategory.updatedby=updatedby;
             
               let dbresponse=await this.categorRepository.save(dbSubcategory);
   
               let result= new ResponseObj<Category>();
               result.message=`${oldername} has been updated to ${dbresponse.name}` ;
               result.status=true;
               result.code=200;
               result.result=dbresponse;
               return result;
            }
            return await this.payloadService.badRequestErrorMessage(validationResult);
        }
        catch(error)
        {
            console.log('Error Message',error,Date.now())
            return new 
           HttpException({message: 'Process error while executing operation:',
           code:500, status:false},
           HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}
