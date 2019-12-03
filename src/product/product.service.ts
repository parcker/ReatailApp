import { Injectable, HttpStatus, Logger, HttpException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Category, SubCategory } from '../entities/category.entity';
import { CreatProductDto, UpdateProductDto } from '../app-Dto/product.dto';
import { Business } from '../entities/business.entity';
import { ResponseObj } from '../shared/generic.response';

@Injectable()
export class ProductService {

    constructor(@InjectRepository(Product)private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)private readonly categoryRepository: Repository<Category>,
    @InjectRepository(SubCategory)private readonly subcategoryRepository: Repository<SubCategory>,
    @InjectRepository(Business)private readonly businessRepository: Repository<Business>) {
     
    }

    async createProduct(product: CreatProductDto,createdby:string,businessId:string): Promise<any> {
        try{
             
             let business= await this.businessRepository.findOne({where:{id:businessId}});
             if(!business) 
             {
                let result= new ResponseObj<string>();
                result.message=`invalid or business Id , no business data found`;
                result.status=false;
                result.result='';
                return result;
             }
          
             let productinfo=await this.productRepository.findOne({where:{itemcode:product.itemcode,business:business,isDisabled:false}});
            
             if(productinfo)
             {
                let result= new ResponseObj<string>();
                result.message=`duplicate item code found :${productinfo.name} and ${productinfo.itemcode}`;
                 result.status=false;
                result.result='';
                return result;
             }
             let category=await this.categoryRepository.findOne({where:{id:product.categoryId}});
             if(category==null)
             {
                let result= new ResponseObj<string>();
                result.message=`invalid or catogry Id , no catogry data found`;
                result.status=false;
                result.result='';
                return result;
             }
             let subCategory;
             if(product.subcategoryId!=null)
             {

               let subcategory=await this.subcategoryRepository.findOne({where:{id:product.subcategoryId}});
               if(subcategory==null)
               {
                  let result= new ResponseObj<string>();
                  result.message=`invalid or subcategory Id , no subcategory data found`;
                  result.status=false;
                  result.result='';
                  return result;
               }
               subCategory=subcategory;
             }
             else{
               subCategory=null;
             }
            
         
             let model =new Product();
             model.business=business;
             model.category=category;
             model.subCategory=subCategory;
             model.name=product.name;
             model.description=product.description;
             model.itemcode=product.itemcode;
             model.packingtype=product.packingtype;
             model.packs=product.packs;
             model.isDisabled=false;
             model.createdby=createdby;
             model.updatedby='';
             model.haspricebench=false;
             model.expiredenabled=false
             var response= await this.productRepository.save(model);
             let result= new ResponseObj<Product>();
             result.message=`${product.name} has been created and activated` ;
             result.status=true;
             result.result=response;
             return result;


        }
        catch(error){ Logger.error(error);
            return new HttpException({message: 'Process error while executing operation:', code:500, status:false},HttpStatus.INTERNAL_SERVER_ERROR);}
    }
    async getProduct(businessId:string):Promise<any>{
       try{

         let business= await this.businessRepository.findOne({where:{id:businessId}});
         if(!business) 
         {
            let result= new ResponseObj<string>();
            result.message=`invalid or business Id , no business data found`;
            result.status=false;
            result.result='';
            return result;
         }
         let productinfo=await this.productRepository.createQueryBuilder("product")
         .leftJoinAndSelect("product.business", "business","business.id = :id",  { id: business.id})
         .where('product.isDisabled = :isDisabled', { isDisabled:false})
         .select(["product.id","product.name", "product.itemcode", "product.packingtype","business.id"]).getMany();
         
         let result= new ResponseObj<Product[]>();
         result.message=`${productinfo.length} records found` ;
         result.status=true;
         result.result=productinfo;
         return result;
       }
       catch(error){ Logger.error(error);
         return new HttpException({message: 'Process error while executing operation:', code:500, status:false},HttpStatus.INTERNAL_SERVER_ERROR);}
    }
    async getProductwithfulldetails(businessId:string):Promise<any>{
      try{

        let business= await this.businessRepository.findOne({where:{id:businessId}});
        if(!business) 
        {
           let result= new ResponseObj<string>();
           result.message=`invalid or business Id , no business data found`;
           result.status=false;
           result.result='';
           return result;
        }

        const productinfo =await this.productRepository
         .createQueryBuilder("product")
         .leftJoinAndSelect("product.category", "category",)
         .leftJoinAndSelect("product.subCategory", "subcategory",)
         .getMany();
     
        let result= new ResponseObj<Product[]>();
        result.message=`${productinfo.length} records found` ;
        result.status=true;
        result.result=productinfo;
        return result;
      }
      catch(error){ Logger.error(error);
        return new HttpException({message: 'Process error while executing operation:', code:500, status:false},HttpStatus.INTERNAL_SERVER_ERROR);}
   }
    async disableproduct(updatedby:string ,status:boolean,productId:string):Promise<any>{
      try{
         let product= await this.productRepository.findOne({where:{id:productId}});
         if(!product) 
         {
            let result= new ResponseObj<string>();
            result.message=`invalid or product Id sent , no product data  found`;
            result.status=false;
            result.result='';
            return result;
         }
         product.isDisabled=status;
         product.updatedby=updatedby;
         const dbresponse=await this.productRepository.save(product);
         let result= new ResponseObj<Product>();
          result.message=`${dbresponse.name} has been updated` ;
          result.status=true;
          result.result=dbresponse;
          return result;
      }
      catch(error){ Logger.error(error);
         return new HttpException({message: 'Process error while executing operation:', code:500, status:false},HttpStatus.INTERNAL_SERVER_ERROR);}
    }
    async updateProduct(updatedby:string ,productId:string,model:UpdateProductDto,businessId:string):Promise<any>{
      try{

         let business= await this.businessRepository.findOne({where:{id:businessId}});
         if(!business) 
         {
            let result= new ResponseObj<string>();
            result.message=`invalid or business Id , no business data found`;
            result.status=false;
            result.result='';
            return result;
         }
         let product= await this.productRepository.findOne({where:{id:productId}});
         if(!product) 
         {
            let result= new ResponseObj<string>();
            result.message=`invalid or product Id sent , no product data  found`;
            result.status=false;
            result.result='';
            return result;
         }
         let category=await this.categoryRepository.findOne({where:{id:model.categoryId}});
         if(category==null)
         {
            let result= new ResponseObj<string>();
            result.message=`invalid or catogry Id , no catogry data found`;
            result.status=false;
            result.result='';
            return result;
         }
         let subCategory;
         if(model.subcategoryId!=null)
         {

           let subcategory=await this.subcategoryRepository.findOne({where:{id:model.subcategoryId}});
           if(subcategory==null)
           {
              let result= new ResponseObj<string>();
              result.message=`invalid or subcategory Id , no subcategory data found`;
              result.status=false;
              result.result='';
              return result;
           }
           subCategory=subcategory;
         }
         else{
           subCategory=null;
         }
         product.business=business;
         product.category=category;
         product.subCategory=subCategory;
         product.name=model.name;
         product.description=model.description;
         product.itemcode=model.itemcode;
         product.packingtype=model.packingtype;
         product.packs=model.packs;
         product.isDisabled=model.isdisabled;
         product.createdby=product.createdby;
         product.updatedby=updatedby;
         product.expiredenabled=product.expiredenabled;
         product.haspricebench=product.haspricebench;

         const dbresponse=await this.productRepository.save(product);
         let result= new ResponseObj<Product>();
          result.message=`${dbresponse.name} has been updated` ;
          result.status=true;
          result.result=dbresponse;
          return result;
      }
      catch(error){ Logger.error(error);
         return new HttpException({message: 'Process error while executing operation:', code:500, status:false},HttpStatus.INTERNAL_SERVER_ERROR);}
    }

}