import { Injectable, HttpStatus, Logger, HttpException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from '../../entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Category, SubCategory } from '../../entities/category.entity';
import { CreatProductDto, UpdateProductDto } from '../../app-Dto/product.dto';
import { Business } from '../../entities/business.entity';
import { ResponseObj } from '../../shared/generic.response';
import { PayloadvalidationService } from '../../shared/payloadvalidation/payloadvalidation.service';
import { ApiResponseService } from '../../shared/response/apiResponse.service';

@Injectable()
export class ProductService {

   constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>,
      @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
      @InjectRepository(SubCategory) private readonly subcategoryRepository: Repository<SubCategory>,
      @InjectRepository(Business) private readonly businessRepository: Repository<Business>,
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


            let model = new Product();
            model.business = business;
            model.category = category;
            model.subCategory = subCategory;
            model.name = product.name;
            model.description = product.description;
            model.itemcode = product.itemcode;
            model.packingtype = product.packingtype;
            model.packs = product.packs;
            model.isDisabled = false;
            model.createdby = createdby;
            model.updatedby = '';
            model.haspricebench = false;
            model.expiredenabled = false
            var response = await this.productRepository.save(model);

            return this.apiResponseService.SuccessResponse(
               `${product.name} has been created and activated`,
               HttpStatus.OK, response);
         }

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
            .leftJoinAndSelect("product.subCategory", "subcategory")
            .where("product.business = :id", { id: businessId })
            .getMany();

         return this.apiResponseService.SuccessResponse(
               `${productinfo.length} records found`,
               HttpStatus.OK, productinfo);
      
      }
      catch (error) {
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
               let result = new ResponseObj<string>();
               result.message = `invalid or subcategory Id , no subcategory data found`;
               result.status = false;
               result.result = '';
               return result;
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
         product.packingtype = model.packingtype;
         product.packs = model.packs;
         product.isDisabled = model.isdisabled;
         product.createdby = product.createdby;
         product.updatedby = updatedby;
         product.expiredenabled = product.expiredenabled;
         product.haspricebench = product.haspricebench;

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

}
