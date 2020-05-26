import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { CreatCustomerDto, CreatSupplierDto, UpdateCustomerDto } from '../app-Dto/partner.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Business } from '../entities/business.entity';
import { Repository } from 'typeorm';
import { ResponseObj } from '../shared/generic.response';
import { Customer, Supplier } from '../entities/partner.entity';
import { UpdateCategoryDto } from '../app-Dto/category.dto';
import { PayloadvalidationService } from '../shared/payloadvalidation/payloadvalidation.service';
import { ApiResponseService } from '../shared/response/apiResponse.service';

@Injectable()
export class PartnersService {

   constructor(@InjectRepository(Business) private readonly businessRepository: Repository<Business>,
      @InjectRepository(Customer) private readonly customerRepository: Repository<Customer>,
      @InjectRepository(Supplier) private readonly supplierRepository: Repository<Supplier>,
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
            customer.business = business;
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
            dbresponse.business = business;
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
   async createsupplierr(model: CreatSupplierDto, createdby: string, businessid: string): Promise<any> {

      try {

         let getbusinessInfo = await this.businessRepository.findOne({ where: { id: businessid, isDisabled: false } });
         if (!getbusinessInfo) {

            let result = new ResponseObj<string>();
            result.message = `invalid or business  Id , no business  data found`;
            result.status = false;
            result.result = '';
            return result;
         }
         let checkduplicate = await this.supplierRepository.findOne({ where: { email: model.email.trim() } });
         if (checkduplicate) {

            let result = new ResponseObj<string>();
            result.message = `duplicate supplier email found,supplier already registered with this email: ${model.email}`;
            result.status = false;
            result.result = '';
            return result;
         }
         let supplier = new Supplier();
         supplier.mobilenumber = model.mobilenumber.trim();
         supplier.companyname = model.company;
         supplier.email = model.email;
         supplier.address = model.address;
         supplier.business = getbusinessInfo;
         supplier.createdby = createdby;
         supplier.updatedby = '';
         supplier.isDisabled = false;

         const dbresponse = await this.supplierRepository.save(supplier);
         let result = new ResponseObj<Supplier>();
         result.message = `${dbresponse.companyname} has been created and activated`;
         result.status = true;
         result.result = dbresponse;
         return result;
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
   async getcustomers(businessid: string): Promise<any> {
      try {

         let getbusinessInfo = await this.businessRepository.findOne({ where: { id: businessid, isDisabled: false } });
         if (!getbusinessInfo) {

            let result = new ResponseObj<string>();
            result.message = `invalid or business  Id , no business  data found`;
            result.status = false;
            result.result = '';
            return result;
         }
         const [customerresponse, count] = await this.customerRepository.findAndCount({ where: { business: getbusinessInfo, isDisabled: false } });
         let result = new ResponseObj<Customer[]>();
         result.message = `Total of ${count} customer found `;
         result.status = true;
         result.result = customerresponse;
         return result;
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

   async getsuppliers(businessid: string): Promise<any> {
      try {

         let getbusinessInfo = await this.businessRepository.findOne({ where: { id: businessid, isDisabled: false } });
         if (!getbusinessInfo) {

            let result = new ResponseObj<string>();
            result.message = `invalid or business  Id , no business  data found`;
            result.status = false;
            result.result = '';
            return result;
         }
         const [supplierresponse, count] = await this.supplierRepository.findAndCount({ where: { business: getbusinessInfo, isDisabled: false } });
         let result = new ResponseObj<Supplier[]>();
         result.message = `Total of ${count} supplier found `;
         result.status = true;
         result.result = supplierresponse;
         return result;
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
}
