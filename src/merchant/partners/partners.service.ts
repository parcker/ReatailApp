import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { CreatCustomerDto, CreatSupplierDto, UpdateCustomerDto } from '../../app-Dto/merchant/partner.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Business, BusinessLocation } from '../../entities/business.entity';
import { Repository, Any } from 'typeorm';
import { Customer, Supplier } from '../../entities/partner.entity';
import { PayloadvalidationService } from '../../shared/payloadvalidation/payloadvalidation.service';
import { ApiResponseService } from '../../shared/response/apiResponse.service';

@Injectable()
export class PartnersService {

   constructor(@InjectRepository(Customer) private readonly customerRepository: Repository<Customer>,
      @InjectRepository(Supplier) private readonly supplierRepository: Repository<Supplier>,
      @InjectRepository(BusinessLocation) private readonly businesslocationRepository: Repository<BusinessLocation>,
      private readonly payloadService: PayloadvalidationService,
      private readonly apiResponseService: ApiResponseService) { }

   async createcustomer(model: CreatCustomerDto, createdby: string, business: Business): Promise<any> {

      try {

         let validationResult = await this.payloadService.validateCustomerAsync(model);
         if (validationResult.IsValid) {
            let checkduplicate = await this.customerRepository.findOne({ where: { mobilenumber: model.mobilenumber.trim() } });
            if (checkduplicate) {
               return this.apiResponseService.FailedBadRequestResponse(
                  `duplicate customer name found, some one is already 
                     registered with this mobile number ${model.mobilenumber}`,
                  HttpStatus.BAD_REQUEST, '');
   
   
            }
            let customer = new Customer();
            customer.mobilenumber = model.mobilenumber.trim();
            customer.fullname = model.fullname;
            customer.age = model.age;
            customer.email = model.email;
            customer.gender = model.gender;
            customer.birthday = model.birthday;
            customer.birthmonth = model.birthmonth;
 
            customer.createdby = createdby;
            customer.updatedby = '';
            customer.isDisabled = false;
   
            const dbresponse = await this.customerRepository.save(customer);
            return this.apiResponseService.SuccessResponse(
               `${dbresponse.fullname} has been created and activated`,
               HttpStatus.OK, dbresponse);
         }
         return await this.payloadService.badRequestErrorMessage(validationResult);
       
      }
      catch (error) {

         Logger.error(error);
         return new
            HttpException({
               message: 'Process error while executing operation:',
               code: 500, status: false
            },
               HttpStatus.INTERNAL_SERVER_ERROR);
      }
   }
   async updatecustomer(model: UpdateCustomerDto,id:string ,updateby: string, business: Business): Promise<any> {

      try {

         let validationResult = await this.payloadService.validateCustomerAsync(model);
         if (validationResult.IsValid) {
            let dbresponse = await this.customerRepository.findOne({ where: { id:id.trim() } });
            if (!dbresponse) {
               return this.apiResponseService.FailedBadRequestResponse(
                  `Invalid customer information found : Update failed`,
                  HttpStatus.BAD_REQUEST, '');
               
            }
            
            dbresponse.mobilenumber = model.mobilenumber.trim();
            dbresponse.fullname = model.fullname;
            dbresponse.age = model.age;
            dbresponse.email = model.email;
            dbresponse.birthday = model.birthday;
            dbresponse.gender = model.gender;
            dbresponse.birthmonth = model.birthmonth;
            
            dbresponse.createdby = updateby;
            dbresponse.updatedby = '';
            dbresponse.isDisabled = false;
            const dbupdateresponse = await this.customerRepository.save(dbresponse);
            return this.apiResponseService.SuccessResponse(
               `${dbresponse.fullname} has been updated`,
               HttpStatus.OK, dbupdateresponse);
         }
         return await this.payloadService.badRequestErrorMessage(validationResult);
        
        
      }
      catch (error) {

         Logger.error(error);
         return new
            HttpException({
               message: 'Process error while executing operation:',
               code: 500, status: false
            },
               HttpStatus.INTERNAL_SERVER_ERROR);
      }
   }
   async createsupplier(model: CreatSupplierDto, createdby: string, business: Business,businesslocationId:string): Promise<any> {

      try {

         let validationResult = await this.payloadService.validateSupplierAsync(model);
         if (validationResult.IsValid) 
         {
            let checkduplicate = await this.supplierRepository.findOne({ where: { mobilenumber: model.mobilenumber.trim(),business:business} });
            if (checkduplicate) {
               return this.apiResponseService.FailedBadRequestResponse(
                  `duplicate supplier mobilenumber found,supplier already registered with this mobile number: ${model.mobilenumber}`,
                  HttpStatus.BAD_REQUEST, '');
             
            }
            let businesslocation:any;
            if(businesslocationId!==''){
               businesslocation=await this.businesslocationRepository.findOne({where:{id:businesslocationId}});
            }
           
            let supplier = new Supplier();
            supplier.mobilenumber = model.mobilenumber.trim();
            supplier.companyname = model.company;
            supplier.email = model.email;
            supplier.twitter = model.twitterlink;
            supplier.instagram = model.instagramlink;
            supplier.facebook = model.facebooklink;
            supplier.address = model.address;
            supplier.street = model.street;
            supplier.website = model.website;
            supplier.contactpersonemail=model.contactpersonemail;
            supplier.contactpersonname=model.contactpersonname;
            supplier.contactpersonphonenumber=model.contactpersonphonenumber;
            supplier.createdby = createdby;
            supplier.updatedby = '';
            supplier.isDisabled = false;
            supplier.business=business;
            if(businesslocation){
               supplier.registeredlocation=businesslocation;
            }
            else{
               supplier.registeredlocation=null;
            }
            const dbresponse = await this.supplierRepository.save(supplier);
            return this.apiResponseService.SuccessResponse(
               `${dbresponse.companyname} has been created and activated`,
               HttpStatus.OK, dbresponse);

         }
        
         return await this.payloadService.badRequestErrorMessage(validationResult);
         
      }
      catch (error) {
         console.log(error);
         Logger.error(error);
         return new
            HttpException({
               message: 'Process error while executing operation:',
               code: 500, status: false
            },
               HttpStatus.INTERNAL_SERVER_ERROR);
      }
   }
   async getcustomers(page: number = 1,business: Business): Promise<any> {
      try {

         const [customerresponse, count] = await this.customerRepository.findAndCount({
            where: {business:business},
           
          });
       
         return this.apiResponseService.SuccessResponse(
            `Total of ${count} customer found `,
            HttpStatus.OK, customerresponse);
      
      }
      catch (error) {

         Logger.error(error);
         return new
            HttpException({
               message: 'Process error while executing operation:',
               code: 500, status: false
            },
               HttpStatus.INTERNAL_SERVER_ERROR);
      }
   }

   async getsuppliers(page: number = 1,business: Business): Promise<any> {
      try {

         const [supplierresponse, count] = await this.supplierRepository.findAndCount({
            where: {business:business}
          
          });
      
         return this.apiResponseService.SuccessResponse(
            `Total of ${count} supplier found `,
            HttpStatus.OK, supplierresponse);
      }
      catch (error) {

         Logger.error(error);
         return new
            HttpException({
               message: 'Process error while executing operation:',
               code: 500, status: false
            },
               HttpStatus.INTERNAL_SERVER_ERROR);
      }
   }
   async updatesupplier(model: CreatSupplierDto,id:string ,updateby: string, business: Business): Promise<any> {

      try {

         let validationResult = await this.payloadService.validateSupplierAsync(model);
         if (validationResult.IsValid) {
            let supplier = await this.supplierRepository.findOne({ where: { id:id,business:business } });
            if (!supplier) {
               return this.apiResponseService.FailedBadRequestResponse(
                  `Invalid supplier information found : Update failed`,
                  HttpStatus.BAD_REQUEST, '');
               
            }
            supplier.mobilenumber = model.mobilenumber.trim();
            supplier.companyname = model.company;
            supplier.email = model.email;
            supplier.twitter = model.twitterlink;
            supplier.instagram = model.instagramlink;
            supplier.facebook = model.facebooklink;
            supplier.address = model.address;
            supplier.street = model.street;
            supplier.website = model.website;
            supplier.contactpersonemail=model.contactpersonemail;
            supplier.contactpersonname=model.contactpersonname;
            supplier.contactpersonphonenumber=model.contactpersonphonenumber;
            supplier.updatedby = updateby;
            const dbupdateresponse = await this.supplierRepository.save(supplier);
            return this.apiResponseService.SuccessResponse(
               `${supplier.companyname} has been updated`,
               HttpStatus.OK, dbupdateresponse);
         }
         return await this.payloadService.badRequestErrorMessage(validationResult);
        
        
      }
      catch (error) {
         console.error(error);
         Logger.error(error);
         return new
            HttpException({
               message: 'Process error while executing operation:'+error.message,
               code: 500, status: false
            },
               HttpStatus.INTERNAL_SERVER_ERROR);
      }
   }
   async changecustomerstatus(business: Business,id:string,status:boolean,updatedby:string):Promise<any>{
      try{

         const customerRep=await this.customerRepository.findOne({ where: { id: id,business:business } })
         if(customerRep){
            return this.apiResponseService.FailedBadRequestResponse(
               `customer data could not be found`,
               HttpStatus.BAD_REQUEST, '');
         }
         customerRep.isDisabled=status;
         customerRep.updatedby = updatedby;
         const dbupdateresponse = await this.customerRepository.save(customerRep);
         return this.apiResponseService.SuccessResponse(
            `${customerRep.fullname} has been updated`,
            HttpStatus.OK, dbupdateresponse);
      }
      catch (error) {
         console.error(error);
         Logger.error(error);
         return new
            HttpException({
               message: 'Process error while executing operation:',
               code: 500, status: false
            },
               HttpStatus.INTERNAL_SERVER_ERROR);
      }
   }
   async changesuppliertatus(business: Business,id:string,status:boolean,updatedby:string):Promise<any>{
      try{

         const supplierRep=await this.supplierRepository.findOne({ where: { id: id,business:business } })
         if(supplierRep){
            return this.apiResponseService.FailedBadRequestResponse(
               `customer data could not be found`,
               HttpStatus.BAD_REQUEST, '');
         }
         supplierRep.isDisabled=status;
         supplierRep.updatedby = updatedby;
         const dbupdateresponse = await this.supplierRepository.save(supplierRep);
         return this.apiResponseService.SuccessResponse(
            `${supplierRep.companyname} has been updated`,
            HttpStatus.OK, dbupdateresponse);
      }
      catch (error) {
         console.error(error);
         Logger.error(error);
         return new
            HttpException({
               message: 'Process error while executing operation:',
               code: 500, status: false
            },
               HttpStatus.INTERNAL_SERVER_ERROR);
      }
   }
   async deleteSupplier(supplierId:string,business: Business):Promise<any>{
      try{
         const response=await this.supplierRepository.findOne({
            where:{id:supplierId,business:business},
            relations: ['purchaseorder',]
         })
         if(!response){
            return this.apiResponseService.FailedBadRequestResponse(
               `invalid supplier Id , no data found`,
               HttpStatus.BAD_REQUEST, '');

         }
        
         if(response.purchaseorder.length>0){
            return this.apiResponseService.FailedBadRequestResponse(
               `Supplier can not be deleted because it is in use!`,
               HttpStatus.BAD_REQUEST, '');
         }
         let resp = await this.supplierRepository.remove(response);
         return this.apiResponseService.SuccessResponse(
            `${response.companyname} has been deleted`,
            HttpStatus.OK, '');
      }
      catch (error) {
         console.error(error);
         Logger.error(error);
         return new
            HttpException({
               message: 'Process error while executing operation:',
               code: 500, status: false
            },
               HttpStatus.INTERNAL_SERVER_ERROR);
      }
   }
   async deleteCustomer():Promise<any>{
      try{
         //await this.supplierRepository.remove()
      }
      catch (error) {
         console.error(error);
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
