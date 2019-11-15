import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Category, SubCategory } from '../entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessLocation, Business } from '../entities/business.entity';
import {paginate, Pagination, IPaginationOptions} from 'nestjs-typeorm-paginate';
import { ResponseObj } from '../shared/generic.response';

@Injectable()
export class CategorysService {

    constructor(@InjectRepository(Category)private readonly categorRepository: Repository<Category>,
    @InjectRepository(SubCategory)private readonly subcategoryRepository: Repository<SubCategory>,
    @InjectRepository(Business)private readonly businessRepository: Repository<Business>) {}

    // async paginate(options: IPaginationOptions): Promise<Pagination<Category[]>> {

    //     return await paginate<Category[]>(this.categorRepository.find({where:{businesslocation:businesslocationId,isDisabled:false}), options);
    // }
    async createCategory(categoryname :string,createdby:string,businessId:string): Promise<any> {
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
             //,businesslocation:getbusinessInfo,isDisabled:false
             let checkduplicate=await this.categorRepository.findOne({where:{name:categoryname}});
           
             if(checkduplicate)
             {
               
                let result= new ResponseObj<string>();
                result.message=`duplicate category name found ${categoryname}`;
                result.status=false;
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
            result.result=dbresponse;
            return result;
            
        }
        catch(error)
        {
            Logger.log(error);
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
        catch(error){
             return new 
            HttpException({message: 'Process error while executing operation:',
            code:500, status:false},
            HttpStatus.INTERNAL_SERVER_ERROR);}

     }
    async updateCategory(categoryId :string,categoryname:string,updatedby:string,businessId:string): Promise<any>{

        try{


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
        catch(error)
        {
            Logger.log(error);
            return new 
            HttpException({message: 'Process error while executing operation:',
            code:500, status:false},
            HttpStatus.INTERNAL_SERVER_ERROR);
        }

     }

    async getcategory(businessId:string):Promise<any>{
        try{

     
            const [dbcategory,count]=await this.categorRepository.findAndCount({where:{business:businessId,isDisabled:false},relations: ["subcategory"]});
            if(!dbcategory){
               
                let result= new ResponseObj<string>();
                result.message=`No category match found`;
                result.status=false;
                result.result='';
                return result;
            }
            let result= new ResponseObj<Category[]>();
            result.message=`Total of ${count} found ` ;
            result.status=true;
            result.result=dbcategory;
     
            return result;
        }
        catch(error)
        {
            Logger.log(error);
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
            Logger.log(error);
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
            Logger.log(error);
            return new 
            HttpException({message: 'Process error while executing operation:',
            code:500, status:false},
            HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    async updateSubCategory(Id :string,categoryname:string,updatedby:string,businessId:string,categoryId:string): Promise<any>{

        try{


            let getbusinessInfo=await this.businessRepository.findOne({where:{id:businessId,isDisabled:false}});
             if(!getbusinessInfo){
                
                let result= new ResponseObj<string>();
                result.message=`invalid or business  Id , no business  data found`;
                result.status=false;
                result.result='';
                return result;
             }

            let dbSubcategory=await this.subcategoryRepository.findOne({where:{id:Id.trim(),business:{id:businessId},isDisabled:false}});
            if(!dbSubcategory){
               
                let result= new ResponseObj<string>();
                result.message=`No Subcategory match found`;
                result.status=false;
                result.result='';
                return result;
            }

            let category=await this.categorRepository.findOne({where:{id:categoryId}});
            if(!category){
               
                let result= new ResponseObj<string>();
                result.message=`No category match found`;
                result.status=false;
                result.result='';
                return result;
            }
            if(categoryId===dbSubcategory.category.id){
                dbSubcategory.category=dbSubcategory.category;
            }
            else{dbSubcategory.category=category}
            dbSubcategory.name=categoryname.trim();
            dbSubcategory.updatedby=updatedby;
          
            let dbresponse=await this.categorRepository.save(dbSubcategory);

            let result= new ResponseObj<Category>();
            result.message=`${dbresponse.name} has been updated` ;
            result.status=true;
            result.result=dbresponse;
            return result;
        }
        catch(error)
        {
            Logger.log(error);
            return new 
            HttpException({message: 'Process error while executing operation:',
            code:500, status:false},
            HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}
