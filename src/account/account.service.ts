import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';

import { SigupDto } from '../app-Dto/usermgr/signup.dto';
import { CompanyService } from '../adminboard/company/company.service';
import { CreateCompanyDto } from '../app-Dto/usermgr/company/company.dto';
import {EmailService} from '../shared/email/emailService';
import { PayloadvalidationService } from '../shared/payloadvalidation/payloadvalidation.service';
import { ApiResponseService } from '../shared/response/apiResponse.service';
import { BusinesslocationService } from '../adminboard/businesslocation/businesslocation.service';
import { ICreateUser } from '../app-Dto/usermgr/user.interface';
import { Business } from '../entities/business.entity';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../app-Dto/usermgr/user.dto';
import { UserType } from '../enums/settings.enum';

@Injectable()
export class AccountService {
    
    constructor(
        private readonly comapnyService: CompanyService,
        private readonly emailservice:EmailService,
        private readonly payloadService: PayloadvalidationService,
        private readonly apiResponseService: ApiResponseService,
        private readonly businesslocationService: BusinesslocationService,
        @InjectRepository(User)private readonly userRepository: Repository<User>) {}

    async businessSignUp(signup: SigupDto): Promise<any> {
      
        try
        {
            let validationResult = await this.payloadService.validateBusinessSignUpAsync(signup);
            if(validationResult.IsValid)
            {
                let user = await this.validateUserEmail(signup.contactPerson.email);
                if (user) 
                {
                    
                    return this.apiResponseService.FailedBadRequestResponse(
                        `Email address already exist !! account cannot be created`,
                        HttpStatus.BAD_REQUEST,'');

                }
                let model=new CreateCompanyDto();
                model.comapanyName=signup.company.comapanyName;
                model.address=signup.company.address;
                 const response=await this.comapnyService.createBusiness(model);
                const businessmodel=response.result;
                if(response.status)
                {
                    
                    let userinfo = {
                        email: signup.contactPerson.email, 
                        firstName:signup.contactPerson.firstName,
                        lastName:signup.contactPerson.lastName,
                        password:signup.contactPerson.password,
                        phonenumber:signup.contactPerson.phonenumber,
                        username:signup.contactPerson.email,
                        emailConfirmed: false,
                        twoFactorEnable:false,
                        accessFailedCount:0,
                        businessId:businessmodel.id,
                        roleId:'',
                        
                    };
                   
                    let response=await this.createBusinessSuperAdmins(userinfo,businessmodel);
                    if(response.status){

                        await this.businesslocationService.create(signup.businesslocation.name,
                            signup.businesslocation.address,
                            businessmodel.id,response.result.id)
                        let emaildata={token:response.result.id, name: response.result.firstName,url:process.env.EMAIL_ACTIVATIONLINK};
                        this.emailservice.sendmail(userinfo.email,'Ecorvids-Account','index.handlebars',emaildata);
                        
                        return this.apiResponseService.SuccessResponse(
                            `sign up completed check your email for activation link`,
                            HttpStatus.OK,'');

                    }
                       
                }

            }
            return await this.payloadService.badRequestErrorMessage(validationResult);
          
          
        }
        catch(error)
        {  
            console.log('businessSignUp Error ',error,Date.now())
            Logger.error(error);
            return new 
            HttpException({message: 'Process error while executing operation:',code:500, status:false},
            HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    public async validateUserEmail(email: string): Promise<boolean> {

        const foundUser = await this.userRepository.findOne({ where: { email:email } });
        if (!foundUser) return false;
        return true;
    }
    async activateAccount(token:string):Promise<any>{

        try{

            let response = await this.activateuserAccount(token);
            return response;
        }
        catch(error)
        {  
            console.log('Error Message',error,Date.now())
            Logger.error(error);
            return new 
            HttpException({message: 'Process error while executing operation:',code:500, status:false},
            HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createBusinessSuperAdmins(userData: ICreateUser, businessInfo:Business): Promise<any> {
   
        try
        {
            
            const newUser = this.userRepository.create(userData);
            newUser.siguptoken='';
            newUser.business=businessInfo;
            newUser.userType=UserType.merchant
            let response= await this.userRepository.save(newUser);
            if(response)
            {
                return this.apiResponseService.SuccessResponse(
                    `create user completed`,
                    HttpStatus.OK,response);
               
            }
            return this.apiResponseService.FailedBadRequestResponse(
                `create user operation failed`,
                HttpStatus.BAD_REQUEST,response);
            
        }
        catch(error)
        {   
            Logger.error(error);
            return new 
            HttpException({message: 'Process error while executing operation:',
            code:500, status:false},
            HttpStatus.INTERNAL_SERVER_ERROR);
        }
       
    }
    public async activateuserAccount(token: string): Promise<any> {

        const foundUser = await this.userRepository.findOne({ where: { id:token } });
        if (!foundUser) 
        { 
            return this.apiResponseService.FailedBadRequestResponse(
                `Invalid/token`,
                HttpStatus.BAD_REQUEST,'');

           
        }
        foundUser.emailConfirmed=true;
        foundUser.isDisabled=false;
        await this.userRepository.save(foundUser);
        return this.apiResponseService.SuccessResponse(
            `account acctivated successfully`,
            HttpStatus.OK,'');

    }
    async creatSupperAdminUsers(model:CreateUserDto):Promise<any>{
       try{
            let validationResult = await this.payloadService.validateSupperAdminUserSignUpAsync(model);
            if(validationResult.IsValid)
            {

                let user = await this.validateUserEmail(model.email);
                if (user) 
                {
                    
                    return this.apiResponseService.FailedBadRequestResponse(
                        `Email address already exist !! account cannot be created`,
                        HttpStatus.BAD_REQUEST,'');

                }
                const newUser = this.userRepository.create(model);
                newUser.username=model.email;
                newUser.createdby=model.email;
                newUser.userType=UserType.admin
                let response= await this.userRepository.save(newUser);
                console.log('Made cahnge to application',response);
                if(response){
                    let emaildata={token:response.id, name: response.firstName,url:process.env.EMAIL_ACTIVATIONLINK};
                    this.emailservice.sendmail(model.email,'Ecorvids-Account','index.handlebars',emaildata);
                    
                    return this.apiResponseService.SuccessResponse(
                        `sign up completed check your email for activation link`,
                        HttpStatus.OK,response);

                }
                return this.apiResponseService.FailedBadRequestResponse(
                    `create user operation failed`,
                    HttpStatus.BAD_REQUEST,response);
            }
            return await this.payloadService.badRequestErrorMessage(validationResult);

       }
       catch(error)
        {  
            console.log('creatSupperAdminUsers Error ',error,Date.now())
            Logger.error(error);
            return new 
            HttpException({message: 'Process error while executing operation:',code:500, status:false},
            HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
}
