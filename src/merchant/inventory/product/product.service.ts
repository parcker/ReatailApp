import { Injectable, HttpStatus, Logger, HttpException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product} from '../../../entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Category, SubCategory } from '../../../entities/category.entity';
import { CreatProductDto, UpdateProductDto, ProductConfigurationDto } from '../../../app-Dto/product.dto';
import { Business } from '../../../entities/business.entity';
import { ResponseObj } from '../../../shared/generic.response';
import { PayloadvalidationService } from '../../../shared/payloadvalidation/payloadvalidation.service';
import { ApiResponseService } from '../../../shared/response/apiResponse.service';
import { ProductConfiguration } from '../../../entities/productconfiguration.entity';

@Injectable()
export class ProductService {

   constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>,
      @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
      @InjectRepository(SubCategory) private readonly subcategoryRepository: Repository<SubCategory>,
      @InjectRepository(Business) private readonly businessRepository: Repository<Business>,
      @InjectRepository(ProductConfiguration) private readonly productconfigurationRepository: Repository<ProductConfiguration>,
      private readonly payloadService: PayloadvalidationService,
      private readonly apiResponseService: ApiResponseService) {

   }

   async createProduct(product: CreatProductDto, createdby: string, business: Business): Promise<any> {
      try {
       
         let validationResult = await this.payloadService.validateProductAsync(product);

         if (validationResult.IsValid) {

       

            let productinfo = await this.productRepository.findOne({ where: { itemcode: product.itemcode, business: business, isDisabled: false } });
            if (productinfo) {
             
               return this.apiResponseService.FailedBadRequestResponse(
                  `duplicate item code found :${productinfo.name} and ${productinfo.itemcode}`,
                  HttpStatus.BAD_REQUEST,'');
            }
            let category = await this.categoryRepository.findOne({ where: { id: product.categoryId } });
            if (category == null) {
              
               return this.apiResponseService.FailedBadRequestResponse(
                  `invalid or catogry Id , no catogry data found`,
                  HttpStatus.BAD_REQUEST, '');
            }
            let subCategory;
            if (product.subcategoryId != '') {

               let subcategory = await this.subcategoryRepository.findOne({ where: { id: product.subcategoryId } });
               if (subcategory == null) {
                 
                  return this.apiResponseService.FailedBadRequestResponse(
                     `invalid or subcategory Id , no subcategory data found`,
                     HttpStatus.BAD_REQUEST, '');
               }
               subCategory = subcategory;
            }
            else {
               subCategory = null;
            }
    

            const model = new Product();
            model.business = business;
            model.category = category;
            model.subCategory = subCategory;
            model.name = product.name;
            model.description = product.description;
            model.itemcode = product.itemcode;
            model.isDisabled = false;
            model.createdby = createdby;
            
            model.updatedby = '';
            model.imagelink = '/defaullink.jpeg';
            const response = await this.productRepository.save(model);
            await this.creatProductConfiguration(product.productconfiguration,response,createdby);
            
            return this.apiResponseService.SuccessResponse(
               `${response.name} has been created and activated`,
               HttpStatus.OK, response);
            
            
         }
         return await this.payloadService.badRequestErrorMessage(validationResult);
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
   async getProduct(businessId: string): Promise<any> {
      try {

        
         let productinfo = await this.productRepository.createQueryBuilder("product")
            .leftJoinAndSelect("product.business", "business", "business.id = :id", { id: businessId })
            .leftJoinAndSelect("product.productconfiguration", "productconfiguration")
            .where('product.isDisabled = :isDisabled', { isDisabled: false })
            .select(["product.id", "product.name", "product.itemcode", "product.packingtype", "business.id"]).getMany();

            return this.apiResponseService.SuccessResponse(
               `${productinfo.length} records found`,
               HttpStatus.OK, productinfo);
        
      }
      catch (error) {
         Logger.error(error);
         return new HttpException({ message: 'Process error while executing operation:', code: 500, status: false }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
   }
   async creatProductConfiguration(productconfiguration: ProductConfigurationDto,product:Product,createdby:string):Promise<any>{
      try{

             
            const productconfig=new ProductConfiguration();
            productconfig.anypromo=productconfiguration.anypromo;
            productconfig.canbepurchased=productconfiguration.canbepurchased;
            productconfig.canbesold=productconfiguration.canbesold;
            productconfig.canexpire=productconfiguration.canexpire;
            productconfig.pack=productconfiguration.packingQty;
            productconfig.leadtime=productconfiguration.leadtime;
            productconfig.isDisabled = false;
            productconfig.createdby = createdby;
            productconfig.updatedby = '';
            const responseproductconfig = await this.productconfigurationRepository.save(productconfig);

            product.productconfiguration=responseproductconfig;
            //Updating productconfiguration on product table
            await this.productRepository.save(product);
            return this.apiResponseService.SuccessResponse(
               `${product.name} configuration setup completed`,
               HttpStatus.OK, responseproductconfig);
      }
      catch (error) {
         Logger.error(error);
         return new HttpException({ message: 'Process error while executing operation:', code: 500, status: false }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
   }
   async getpacking(): Promise<any> {
      try {

         let packingtype = [{ id: 1, vaule: 'Cartons' }, { id: 2, vaule: 'Single' }]
            return this.apiResponseService.SuccessResponse(
               `${packingtype.length} records found`,
               HttpStatus.OK, packingtype);
        
      }
      catch (error) {
         Logger.error(error);
         return new HttpException({ message: 'Process error while executing operation:', code: 500, status: false }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
   }
   async getProductwithfulldetails(businessId: string): Promise<any> {
      try {

        
         const productinfo = await this.productRepository
            .createQueryBuilder("product")
            .leftJoinAndSelect("product.category", "category")
            .leftJoinAndSelect("product.productconfiguration", "productconfiguration")
            .leftJoinAndSelect("product.subCategory", "subcategory")
            .where("product.business = :id", { id: businessId })
            .getMany();

         return this.apiResponseService.SuccessResponse(
               `${productinfo.length} records found`,
               HttpStatus.OK, productinfo);
      
      }
      catch (error) {
         console.log(error);
         Logger.error(error);
         return new HttpException({ message: 'Process error while executing operation:', code: 500, status: false }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
   }
   async disableproduct(updatedby: string, status: boolean, productId: string): Promise<any> {
      try {
         let product = await this.productRepository.findOne({ where: { id: productId } });
         if (!product) {
           
            return this.apiResponseService.FailedBadRequestResponse(
               `invalid or product Id sent , no product data  found`,
               HttpStatus.BAD_REQUEST, '');
         }
         product.isDisabled = status;
         product.updatedby = updatedby;
         const dbresponse = await this.productRepository.save(product);
         
         return this.apiResponseService.SuccessResponse(
            `${dbresponse.name} records found`,
            HttpStatus.OK, dbresponse);
    
      }
      catch (error) {
         Logger.error(error);
         return new HttpException({ message: 'Process error while executing operation:', code: 500, status: false }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
   }
   async updateProduct(updatedby: string, productId: string, model: UpdateProductDto, business: Business): Promise<any> {
      try {

       
       
         let product = await this.productRepository.findOne({ where: { id: productId } });
       
         if (!product) {
           
            return this.apiResponseService.FailedBadRequestResponse(
               `invalid or product Id sent , no product data  found`,
               HttpStatus.BAD_REQUEST, '');
         }
         let category = await this.categoryRepository.findOne({ where: { id: model.categoryId } });
         if (category == null) {

            return this.apiResponseService.FailedBadRequestResponse(
               `invalid or catogry Id , no catogry data found`,
               HttpStatus.BAD_REQUEST, '');

         }
         let subCategory;
         if (model.subcategoryId != '') {

            let subcategory = await this.subcategoryRepository.findOne({ where: { id: model.subcategoryId } });
            if (subcategory == null) {
              
               return this.apiResponseService.FailedBadRequestResponse(
                  `invalid or subcategory Id , no subcategory data found`,
                  HttpStatus.BAD_REQUEST, '');
   
            }
            subCategory = subcategory;
         }
         else {
            subCategory = null;
         }
         product.business = business;
         product.category = category;
         product.subCategory = subCategory;
         product.name = model.name;
         product.description = model.description;
         product.itemcode = model.itemcode;
         product.isDisabled = model.isdisabled;
         product.createdby = product.createdby;
         product.updatedby = updatedby;
         const dbresponse = await this.productRepository.save(product);
         return this.apiResponseService.SuccessResponse(
            `${dbresponse.name} has been updated`,
            HttpStatus.OK, dbresponse);

        
      }
      catch (error) {
         Logger.error(error);
         return new HttpException({ message: 'Process error while executing operation:', code: 500, status: false }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
   }
   async updateProductConfiguration(productconfiguration: ProductConfigurationDto,id:string,updatedby:string,status:boolean):Promise<any>{
      try{

             let productconfig = await this.productconfigurationRepository.findOne({ where: { id: id } });
             if (!productconfig) {
           
               return this.apiResponseService.FailedBadRequestResponse(
                  `invalid  productconfig Id sent , no productconfig data  found`,
                  HttpStatus.BAD_REQUEST, '');
            }
            productconfig.anypromo=productconfiguration.anypromo;
            productconfig.canbepurchased=productconfiguration.canbepurchased;
            productconfig.canbesold=productconfiguration.canbesold;
            productconfig.canexpire=productconfiguration.canexpire;
            productconfig.pack=productconfiguration.packingQty;
            productconfig.leadtime=productconfiguration.leadtime;
            productconfig.isDisabled = status;
            productconfig.updatedby = updatedby;
            const responseproductconfig = await this.productconfigurationRepository.save(productconfig);
          return this.apiResponseService.SuccessResponse(
               `configuration setup update completed`,
               HttpStatus.OK, responseproductconfig);
      }
      catch (error) {
         Logger.error(error);
         return new HttpException({ message: 'Process error while executing operation:', code: 500, status: false }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
   }

}