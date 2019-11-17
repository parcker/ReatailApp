import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { CreatCustomerDto, CreatSupplierDto, UpdateCustomerDto } from '../app-Dto/partner.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Business } from '../entities/business.entity';
import { Repository } from 'typeorm';
import { ResponseObj } from '../shared/generic.response';
import { Customer, Supplier } from '../entities/partner.entity';
import { UpdateCategoryDto } from '../app-Dto/category.dto';

@Injectable()
export class PartnersService {

     constructor( @InjectRepository(Business)private readonly businessRepository: Repository<Business>,
     @InjectRepository(Customer)private readonly customerRepository: Repository<Customer>,
     @InjectRepository(Supplier)private readonly supplierRepository: Repository<Supplier>) { }

     async createcustomer(model:CreatCustomerDto,createdby:string,businessid:string):Promise<any>{

        try{

            let getbusinessInfo=await this.businessRepository.findOne({where:{id:businessid,isDisabled:false}});
            if(!getbusinessInfo){
               
               let result= new ResponseObj<string>();
               result.message=`invalid or business  Id , no business  data found`;
               result.status=false;
               result.result='';
               return result;
            }
            let checkduplicate=await this.customerRepository.findOne({where:{mobilenumber:model.mobilenumber.trim()}});
            if(checkduplicate)
            {
              
               let result= new ResponseObj<string>();
               result.message=`duplicate customer name found, some one is already 
               registered with this mobile number ${model.mobilenumber}`;
               result.status=false;
               result.result='';
               return result;
            }
           let customer =new Customer();
           customer.mobilenumber=model.mobilenumber.trim();
           customer.fullname=model.fullname;
           customer.age=model.age;
           customer.email=model.email;
           customer.gender=model.gender;
           customer.birthday=model.birthday;
           customer.birthmonth=model.birthmonth;
           customer.business=getbusinessInfo;
           customer.createdby=createdby;
           customer.updatedby='';
           customer.isDisabled=false;

           const dbresponse=await this.customerRepository.save(customer);
           let result= new ResponseObj<Customer>();
            result.message=`${dbresponse.fullname} has been created and activated` ;
            result.status=true;
            result.result=dbresponse;
            return result;
        }
        catch(error){
            
            Logger.log(error);
            return new 
            HttpException({message: 'Process error while executing operation:',
            code:500, status:false},
            HttpStatus.INTERNAL_SERVER_ERROR);
        }
     }
     async updatecustomer(model:UpdateCustomerDto,updateby:string,businessid:string):Promise<any>{

        try{

            let getbusinessInfo=await this.businessRepository.findOne({where:{id:businessid,isDisabled:false}});
            if(!getbusinessInfo){
               
               let result= new ResponseObj<string>();
               result.message=`invalid or business  Id , no business  data found`;
               result.status=false;
               result.result='';
               return result;
            }
            let checkduplicate=await this.customerRepository.findOne({where:{id:model.id.trim()}});
            if(checkduplicate)
            {
              
               let result= new ResponseObj<string>();
               result.message=`duplicate customer name found, some one is already 
               registered with this mobile number ${model.mobilenumber}`;
               result.status=false;
               result.result='';
               return result;
            }
           let customer =new Customer();
           customer.mobilenumber=model.mobilenumber.trim();
           customer.fullname=model.fullname;
           customer.age=model.age;
           customer.email=model.email;
           customer.birthday=model.birthday;
           customer.gender=model.gender;
           customer.birthmonth=model.birthmonth;
           customer.business=getbusinessInfo;
           customer.createdby=updateby;
           customer.updatedby='';
           customer.isDisabled=false;

           const dbresponse=await this.customerRepository.save(customer);
           let result= new ResponseObj<Customer>();
            result.message=`${dbresponse.fullname} has been created and activated` ;
            result.status=true;
            result.result=dbresponse;
            return result;
        }
        catch(error){
            
            console.log(error);
            return new 
            HttpException({message: 'Process error while executing operation:',
            code:500, status:false},
            HttpStatus.INTERNAL_SERVER_ERROR);
        }
     }
     async createsupplierr(model:CreatSupplierDto,createdby:string,businessid:string):Promise<any>{

        try{

            let getbusinessInfo=await this.businessRepository.findOne({where:{id:businessid,isDisabled:false}});
            if(!getbusinessInfo){
               
               let result= new ResponseObj<string>();
               result.message=`invalid or business  Id , no business  data found`;
               result.status=false;
               result.result='';
               return result;
            }
            let checkduplicate=await this.supplierRepository.findOne({where:{email:model.email.trim()}});
            if(checkduplicate)
            {
              
               let result= new ResponseObj<string>();
               result.message=`duplicate supplier email found,supplier already registered with this email: ${model.email}`;
               result.status=false;
               result.result='';
               return result;
            }
           let supplier =new Supplier();
           supplier.mobilenumber=model.mobilenumber.trim();
           supplier.companyname=model.company;
           supplier.email=model.email;
           supplier.address=model.address;
           supplier.business=getbusinessInfo;
           supplier.createdby=createdby;
           supplier.updatedby='';
           supplier.isDisabled=false;

           const dbresponse=await this.supplierRepository.save(supplier);
           let result= new ResponseObj<Supplier>();
            result.message=`${dbresponse.companyname} has been created and activated` ;
            result.status=true;
            result.result=dbresponse;
            return result;
        }
        catch(error){
            
            Logger.log(error);
            return new 
            HttpException({message: 'Process error while executing operation:',
            code:500, status:false},
            HttpStatus.INTERNAL_SERVER_ERROR);
        }
     }
     async getcustomers(businessid:string):Promise<any>{
         try{

            let getbusinessInfo=await this.businessRepository.findOne({where:{id:businessid,isDisabled:false}});
            if(!getbusinessInfo){
               
               let result= new ResponseObj<string>();
               result.message=`invalid or business  Id , no business  data found`;
               result.status=false;
               result.result='';
               return result;
            }
            const [customerresponse,count]=await this.customerRepository.findAndCount({where:{business:getbusinessInfo,isDisabled:false}});
            let result= new ResponseObj<Customer[]>();
            result.message=`Total of ${count} customer found ` ;
            result.status=true;
            result.result=customerresponse;
            return result;
         }
         catch(error){
            
            Logger.log(error);
            return new 
            HttpException({message: 'Process error while executing operation:',
            code:500, status:false},
            HttpStatus.INTERNAL_SERVER_ERROR);
        }
     }

     async getsuppliers(businessid:string):Promise<any>{
        try{

           let getbusinessInfo=await this.businessRepository.findOne({where:{id:businessid,isDisabled:false}});
           if(!getbusinessInfo){
              
              let result= new ResponseObj<string>();
              result.message=`invalid or business  Id , no business  data found`;
              result.status=false;
              result.result='';
              return result;
           }
           const [supplierresponse,count]=await this.supplierRepository.findAndCount({where:{business:getbusinessInfo,isDisabled:false}});
           let result= new ResponseObj<Supplier[]>();
           result.message=`Total of ${count} supplier found ` ;
           result.status=true;
           result.result=supplierresponse;
           return result;
        }
        catch(error){
           
           Logger.log(error);
           return new 
           HttpException({message: 'Process error while executing operation:',
           code:500, status:false},
           HttpStatus.INTERNAL_SERVER_ERROR);
       }
    }
}
