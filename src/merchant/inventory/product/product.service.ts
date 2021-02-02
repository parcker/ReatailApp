import { Injectable, HttpStatus, Logger, HttpException } from '@nestjs/common';
import { In, MoreThan, Repository } from 'typeorm';
import { Product } from '../../../entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Category, SubCategory } from '../../../entities/category.entity';
import { CreatProductDto, UpdateProductDto, ProductConfigurationDto, PaginationDto } from '../../../app-Dto/merchant/product.dto';
import { Business, BusinessLocation } from '../../../entities/business.entity';
import { PayloadvalidationService } from '../../../shared/payloadvalidation/payloadvalidation.service';
import { ApiResponseService } from '../../../shared/response/apiResponse.service';
import { ProductConfiguration } from '../../../entities/productconfiguration.entity';
import { StoreProduct } from '../../../entities/storeproduct.entity';
import { Tax } from '../../../entities/tax.entity';
import { Warehouse } from '../../../entities/warehouse.entity';
import { StockCard } from '../../../entities/stockcard.entity';
import { PriceConfiguration } from '../../../entities/priceconfiguration.entity';
import { PriceConfigurationDto } from '../../../app-Dto/merchant/priceconfiguration.dto';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class ProductService {


   constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>,
      @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
      @InjectRepository(SubCategory) private readonly subcategoryRepository: Repository<SubCategory>,
      @InjectRepository(Business) private readonly businessRepository: Repository<Business>,
      @InjectRepository(BusinessLocation) private readonly businesslocationRepository: Repository<BusinessLocation>,
      @InjectRepository(Warehouse) private readonly warehouseRepository: Repository<Warehouse>,
      @InjectRepository(StoreProduct) private readonly storeproductRepository: Repository<StoreProduct>,
      @InjectRepository(StockCard) private readonly stockcardRepository: Repository<StockCard>,
      @InjectRepository(Tax) private readonly taxRepository: Repository<Tax>,
      @InjectRepository(ProductConfiguration) private readonly productconfigurationRepository: Repository<ProductConfiguration>,
      @InjectRepository(PriceConfiguration) private readonly priceconfigRepository: Repository<PriceConfiguration>,
      @InjectRepository(StoreProduct) private readonly StoreProductRepository: Repository<StoreProduct>,

      private readonly payloadService: PayloadvalidationService,
      private readonly apiResponseService: ApiResponseService) {

   }

   async deleteproduct(productId: string, business: Business): Promise<any> {
      try {

         let productinfo = await this.productRepository.findOne({ where: { id: productId, business: business, isDisabled: false } });

         if (!productinfo) {

            return this.apiResponseService.FailedBadRequestResponse(
               `invalid or product Id , no product data found`,
               HttpStatus.BAD_REQUEST, '');
         }
         if (await this.StoreProductRepository.findOne({ where: { product: productinfo } })) {
            return this.apiResponseService.FailedBadRequestResponse(
               `product has been used , delete not permited`,
               HttpStatus.BAD_REQUEST, '');
         };


         let resp = await this.productRepository.remove(productinfo);
         return this.apiResponseService.SuccessResponse(
            `${productinfo.name} has been deleted`,
            HttpStatus.OK, '');

      }
      catch (error) {
         console.error('deleteproduct Error:',error.message);
         Logger.error(error);
         return new HttpException({
            message: 'Process error while executing operation:',
            code: 500, status: false
         },
            HttpStatus.INTERNAL_SERVER_ERROR);
      }
   }
   async createProduct(product: CreatProductDto, createdby: string, business: Business): Promise<any> {
      try {

         let validationResult = await this.payloadService.validateProductAsync(product);

         if (validationResult.IsValid) {

            let productinfo = await this.productRepository.findOne({ where: { itemcode: product.itemcode, business: business, isDisabled: false } });
            if (productinfo) {

               return this.apiResponseService.FailedBadRequestResponse(
                  `duplicate item code found :${productinfo.name} and ${productinfo.itemcode}`,
                  HttpStatus.BAD_REQUEST, '');
            }
            let category = await this.categoryRepository.findOne({ where: { id: product.categoryId, business: business } });
            if (category == null) {

               return this.apiResponseService.FailedBadRequestResponse(
                  `invalid or catogry Id , no catogry data found`,
                  HttpStatus.BAD_REQUEST, '');
            }
            let subCategory;
            if (product.subcategoryId !== null) {
               if (product.subcategoryId !== '') {
                  let subcategory = await this.subcategoryRepository.findOne({ where: { id: product.subcategoryId } });
                  if (!subcategory) {

                     return this.apiResponseService.FailedBadRequestResponse(
                        `invalid or subcategory Id , no subcategory data found`,
                        HttpStatus.BAD_REQUEST, '');

                  }
                  subCategory = subcategory;
               }
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

            const configRes = await this.creatProductConfiguration(product.productconfiguration, response, createdby);
            if (configRes.status && response) {

               await this.creatDefaultPriceConfiguration(response,createdby);
               return this.apiResponseService.SuccessResponse(
                  `${response.name} has been created and activated`,
                  HttpStatus.OK, response);
            }
            if (response) {
               return this.apiResponseService.SuccessResponse(
                  `${response.name} has been created and activated but product configuration failed`,
                  HttpStatus.OK, response);
            }
            return this.apiResponseService.FailedBadRequestResponse(
               `product creation failed and configuration failed`,
               HttpStatus.INTERNAL_SERVER_ERROR, '');


         }
         return await this.payloadService.badRequestErrorMessage(validationResult);
      }
      catch (error) {
         console.error('createProduct Error:',error.message);
         return new HttpException({
            message: 'Process error while executing operation:',
            code: 500, status: false
         },
            HttpStatus.INTERNAL_SERVER_ERROR);
      }
   }
   async getProduct(page: number = 1, businessId: string): Promise<any> {
      try {

         let productinfo = await this.productRepository.find({
            where: {
              isDisabled: false,business: { id: businessId }
            },
            join: {
              alias: "product",
              leftJoinAndSelect: {
                "productconfiguration": "product.productconfiguration",
                "category": "product.category",
                "subCategory": "product.subCategory",
                "tax": "productconfiguration.salestax"
              }
            },cache:true
          });
          
         
         return this.apiResponseService.SuccessResponse(
            `${productinfo.length} records found`,
            HttpStatus.OK, productinfo);

      }
      catch (error) {
         console.error('getProduct Error:',error.message);
         Logger.error(error);
         return new HttpException({ message: 'Process error while executing operation:', code: 500, status: false }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
   }
   async creatProductConfiguration(productconfiguration: ProductConfigurationDto,product: Product, createdby: string): Promise<any> {
      try {


         const productconfig = new ProductConfiguration();
         productconfig.anypromo = productconfiguration.anypromo;
         productconfig.canbepurchased = productconfiguration.canbepurchased;
         productconfig.canbesold = productconfiguration.canbesold;
         productconfig.canexpire = productconfiguration.canexpire;
         productconfig.pack = productconfiguration.pack;
         productconfig.leadtime = productconfiguration.leadtime;
         if(productconfiguration.salestaxId!=='')
         {
            productconfig.salestax=await this.taxRepository.findOne({where:{id:productconfiguration.salestaxId}});
         }

         productconfig.isDisabled = false;
         productconfig.createdby = createdby;
         productconfig.updatedby = '';
         const responseproductconfig = await this.productconfigurationRepository.save(productconfig);
         if (responseproductconfig) 
         {
            product.productconfiguration = responseproductconfig;

            let update=await this.productRepository.save(product);
            if(update){
              
               return this.apiResponseService.SuccessResponse(
                  `${product.name} configuration setup completed`,
                  HttpStatus.OK, responseproductconfig);
            }
            
         }
         return this.apiResponseService.FailedBadRequestResponse(
            `product configuration failed`,
            HttpStatus.INTERNAL_SERVER_ERROR, '');
      }
      catch (error) {
         console.error('creatProductConfiguration Error:',error.message);
         Logger.error(error);
         return new HttpException({ message: 'Process error while executing operation:', code: 500, status: false }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
   }

   async creatDefaultPriceConfiguration(product: Product, createdby: string): Promise<any> {
      try {


         const price = new PriceConfiguration();
         price.isDisabled = false;
         price.product=product;
         price.createdby = createdby;
         price.updatedby = '';
         await this.priceconfigRepository.save(price);
          return this.apiResponseService.SuccessResponse(
            `Price configuration failed`,
            HttpStatus.INTERNAL_SERVER_ERROR, '');
      }
      catch (error) {
         console.error('creatDefaultPriceConfiguration Error:',error.message);
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
         console.error('getpacking Error:',error.message);
         Logger.error(error);
         return new HttpException({ message: 'Process error while executing operation:', code: 500, status: false }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
   }
   async getProductwithfulldetails(page: number = 1, businessId: string): Promise<any> {
      try {

         
         let productinfo = await this.productRepository.find({
            where: {
              isDisabled: false,business: { id: businessId }
            },
            join: {
              alias: "product",
              leftJoinAndSelect: {
                "productconfiguration": "product.productconfiguration",
                "category": "product.category",
                "subCategory": "product.subCategory",
                "tax": "productconfiguration.salestax"
              }
            },cache:true
            
          });
          

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
         console.log('updateProduct **', productId, model, business);
         let validationResult = await this.payloadService.validateProductUpdateAsync(model);
         if (validationResult.IsValid) {
            let product = await this.productRepository.findOne({ where: { id: productId, business: business } });
            if (!product) {

               return this.apiResponseService.FailedBadRequestResponse(
                  `invalid or product Id sent , no product data  found`,
                  HttpStatus.BAD_REQUEST, '');
            }
            let category = await this.categoryRepository.findOne({ where: { id: model.categoryId, business: business } });
            if (!category) {

               return this.apiResponseService.FailedBadRequestResponse(
                  `invalid or catogry Id , no catogry data found`,
                  HttpStatus.BAD_REQUEST, '');

            }
            let subCategory;
            console.log('Completion', model.subcategoryId === null);
            if (model.subcategoryId !== null) {
               if (model.subcategoryId !== '') {
                  let subcategory = await this.subcategoryRepository.findOne({ where: { id: model.subcategoryId } });
                  if (!subcategory) {

                     return this.apiResponseService.FailedBadRequestResponse(
                        `invalid or subcategory Id , no subcategory data found`,
                        HttpStatus.BAD_REQUEST, '');

                  }
                  subCategory = subcategory;
               }

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
         return await this.payloadService.badRequestErrorMessage(validationResult);

      }
      catch (error) {
         console.error('updateProduct Error:',error.message);
         Logger.error(error);
         return new HttpException({ message: 'Process error while executing operation:', code: 500, status: false }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
   }
   async updateProductConfiguration(productconfiguration: ProductConfigurationDto, id: string, updatedby: string, status: boolean): Promise<any> {
      try {

         let productconfig = await this.productconfigurationRepository.findOne({ where: { id: id } });
         if (!productconfig) {

            return this.apiResponseService.FailedBadRequestResponse(
               `invalid  productconfig Id sent , no productconfig data  found`,
               HttpStatus.BAD_REQUEST, '');
         }
         productconfig.anypromo = productconfiguration.anypromo;
         productconfig.canbepurchased = productconfiguration.canbepurchased;
         productconfig.canbesold = productconfiguration.canbesold;
         productconfig.canexpire = productconfiguration.canexpire;
         productconfig.pack = productconfiguration.pack;
         productconfig.leadtime = productconfiguration.leadtime;
         productconfig.salestax=await this.taxRepository.findOne({where:{id:productconfiguration.salestaxId}});
         productconfig.isDisabled = status;
         productconfig.updatedby = updatedby;
         const responseproductconfig = await this.productconfigurationRepository.save(productconfig);
         return this.apiResponseService.SuccessResponse(
            `configuration setup update completed`,
            HttpStatus.OK, responseproductconfig);
      }
      catch (error) {

         console.error('updateProductConfiguration Error:',error.message);
         Logger.error(error);
         return new HttpException({ message: 'Process error while executing operation:', code: 500, status: false }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
   }
   

  
   async getProductForSale(paginationDto: PaginationDto,businesslocationId:string) : Promise<any>{

      try{
         
           const skippedItems = (paginationDto.page - 1) * paginationDto.limit;
           const warehouse= await this.warehouseRepository.find(
              {where:{businesslocation:{id:businesslocationId}}
              
            });
        
           if(!warehouse)
           {

            return this.apiResponseService.SuccessResponse(
               `0 product data found`,
               HttpStatus.OK, '');
            }
            const [result,count]=  await this.productRepository.createQueryBuilder("p")
            .where("w.id IN (:...ids)",{ids:warehouse.map(c=>c.id)})
            .leftJoin("p.storeproduct","s")
            .leftJoin("p.priceconfiguration", "priceconfiguration")
            .leftJoin("p.productconfiguration", "productconfiguration")
            .leftJoin("s.warehouse","w")
            .select(['p.name','p.itemcode','p.id', 's.instockqty','w.name','w.id','priceconfiguration.wholesalesellingprice',
            'priceconfiguration.retailsellingprice','productconfiguration.pack','productconfiguration.canbesold',
            'productconfiguration.anypromo'])
            .offset(skippedItems)
            .limit(paginationDto.limit)
            .getManyAndCount();
          
           return this.apiResponseService.SuccessResponse( `total count ${count} page: ${paginationDto.page} limit: ${paginationDto.limit}`,HttpStatus.OK, result);
       

      }
      catch (error) {

         console.error('getProductForSale Error:',error.message);
         Logger.error(error);
         return new HttpException({ message: 'Process error while executing operation:', code: 500, status: false }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
   }
   async getProductForPurchase(paginationDto: PaginationDto,business: Business) : Promise<any>{


      try{

            const skippedItems = (paginationDto.page - 1) * paginationDto.limit;

            const [result,count]=  await this.productRepository.createQueryBuilder("product")
           .leftJoin("product.productconfiguration","product_configuration")
           .leftJoin("product.priceconfiguration","price_configuration") 
           .leftJoin("product.business","business")
           .where("business.Id = :Id", { Id:business.id})
           .andWhere("product.isDisabled = :isDisabled",{isDisabled:false})
           .andWhere("price_configuration.Active = :active", { active:true})
           .select(['product.name','product.itemcode','product.id','price_configuration.wholesalecostprice','price_configuration.unitcostprice',
           'product_configuration.pack','product_configuration.canbepurchased'])
           .offset(skippedItems)
            .limit(paginationDto.limit)
           .getManyAndCount();
           return this.apiResponseService.SuccessResponse( `total count ${count} page: ${paginationDto.page} limit: ${paginationDto.limit}`,HttpStatus.OK, result);
       

      }
      catch (error) {

         console.error('getstockforbusinesslocation Error:',error.message);
         Logger.error(error);
         return new HttpException({ message: 'Process error while executing operation:', code: 500, status: false }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
   }
   async getProductForTransferRequest(paginationDto: PaginationDto,business: Business) : Promise<any>{


      try{

            const skippedItems = (paginationDto.page - 1) * paginationDto.limit;
            const warehouse= await this.warehouseRepository.createQueryBuilder("w")
            .leftJoin("w.businesslocation","bl")
            .where("bl.business.id =:businessId",{businessId:business.id})
            .select(['w.id'])
            .getMany();

            console.log('All warehouse for ',warehouse,business.id);
            if(!warehouse)
            {
 
               return this.apiResponseService.SuccessResponse(
                  `0 product data found`,
                  HttpStatus.OK, '');
            }
            const [result,count]=  await this.productRepository.createQueryBuilder("p")
            .where("w.id IN (:...ids)",{ids:warehouse.map(c=>c.id)})
            .andWhere("s.instockqty > 0")
            .leftJoin("p.storeproduct","s")
            .leftJoin("s.warehouse","w")
            .select(['p.name','p.itemcode','p.id', 's.instockqty','w.name','w.id'])
            .offset(skippedItems)
            .limit(paginationDto.limit)
            .getManyAndCount();

            return this.apiResponseService.SuccessResponse( `total count ${count} page: ${paginationDto.page} limit: ${paginationDto.limit}`,HttpStatus.OK, result);
       

      }
      catch (error) {

         console.error('getProductForTransferRequest Error:',error.message);
         Logger.error(error);
         return new HttpException({ message: 'Process error while executing operation:', code: 500, status: false }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
   }

   async SeedProducttoStock(productId:string,warehouseId:string,quantity:number,businesslocation:BusinessLocation,business:Business):Promise<any>{

      try{

            const product=await this.productRepository.findOne({where:{id:productId,isDisabled:false,business:business}});
            if(!product){
               return this.apiResponseService.FailedBadRequestResponse(
                  `invalid or product Id , no product data found`,
                  HttpStatus.BAD_REQUEST, '');
            }
             const data =  await this.warehouseRepository.createQueryBuilder("warehouse")
             .where("warehouse.businesslocation.id = :id", { id:businesslocation.id})
             .andWhere("warehouse.isDisabled = :isDisabled",{isDisabled:false})
             .getOne();
            
            if(!data){
               return this.apiResponseService.FailedBadRequestResponse(
                  `invalid or warehouse Id , no product data found`,
                  HttpStatus.BAD_REQUEST, '');
            }
           
            const getstockInfo=await this.storeproductRepository.findOne({where:{product:product,warehouse:data}});
            if(getstockInfo)
            {
               getstockInfo.instockqty=(getstockInfo.instockqty+22);
               const response=await this.storeproductRepository.save(getstockInfo);
               if(response.id){

                  const stockmovemnt=new StockCard();
                  stockmovemnt.Direction=1;//In
                  stockmovemnt.StockMovementDescription='Sock-IN';
                  stockmovemnt.businesslocation=businesslocation;
                  stockmovemnt.Quantity=quantity;
                  stockmovemnt.product=product;
                  const stockcardResp=await this.stockcardRepository.save(stockmovemnt);
                  if(stockcardResp){

                     return this.apiResponseService.SuccessResponse(
                        `Product added to stock`,
                        HttpStatus.OK, '');
                  }
               }
            }
            else{

               const model=new StoreProduct();
               model.product=product;
               model.warehouse=data;
               model.instockqty=quantity;
               model.availableqty=0;
               model.committedqty=0;
               model.orderedqty=0;

               const response=await this.storeproductRepository.save(model);
               if(response.id){

                  const stockmovemnt=new StockCard();
                  stockmovemnt.Direction=1;//In
                  stockmovemnt.StockMovementDescription='Sock-IN';
                  stockmovemnt.businesslocation=businesslocation;
                  stockmovemnt.Quantity=quantity;
                  stockmovemnt.createdby='System'
                  stockmovemnt.updatedby='';
                  stockmovemnt.product=product;
                  const stockcardResp=await this.stockcardRepository.save(stockmovemnt);
                  if(stockcardResp){

                     return this.apiResponseService.SuccessResponse(
                        `Product added to stock`,
                        HttpStatus.OK, '');
                  }
               }
            }
          
           
            
      }
      catch (error) {

         console.error('getstockforbusinesslocation Error:',error.message);
         Logger.error(error);
         return new HttpException({ message: 'Process error while executing operation:', code: 500, status: false }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
   }

   async updatePriceConfiguration(model:PriceConfigurationDto,updatedby:string,business:Business):Promise<any>{
      try{

         const productinfo=await this.productRepository.findOne({where:{id:model.productId,isDisabled:false,business:business}});
         if(!productinfo){
            return this.apiResponseService.FailedBadRequestResponse(
               `invalid  product Id , no product data found`,
               HttpStatus.BAD_REQUEST, '');
         }

         const priceinfo=await this.priceconfigRepository.findOne({where:{product:productinfo,isDisabled:false}});
         if(!priceinfo){
            return this.apiResponseService.FailedBadRequestResponse(
               `invalid  price configuration Id , no price configuration data found`,
               HttpStatus.BAD_REQUEST, '');
         }
         priceinfo.updatedby=updatedby;
         var response =await this.priceconfigRepository.save(priceinfo);
         return this.apiResponseService.SuccessResponse(
            `${productinfo.name} : price configuration processed completed`,
            HttpStatus.OK,response);

      }
      catch (error) {
         console.error('deleteproduct Error:',error.message);
         return new HttpException({
            message: 'Process error while executing operation:',
            code: 500, status: false
         },
            HttpStatus.INTERNAL_SERVER_ERROR);
      }
   }

}
