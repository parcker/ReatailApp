import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ResponseObj } from '../shared/generic.response';
import { SigupDto } from '../app-Dto/usermgr/signup.dto';
import { CompanyService } from '../company/company.service';
import { CreateCompanyDto } from '../app-Dto/usermgr/company/company.dto';
import {EmailService} from '../shared/email/emailService';
import { PayloadvalidationService } from '../shared/payloadvalidation/payloadvalidation.service';

@Injectable()
export class AccountService {
    
    constructor(private readonly userService: UsersService, 
        private readonly comapnyService: CompanyService,
        private readonly emailservice:EmailService,
        private readonly payloadService: PayloadvalidationService) {}

    public async create(signup: SigupDto): Promise<any> {
      
        try
        {
            let validationResult = await this.payloadService.validateSignUpAsync(signup);
           

            if(validationResult.IsValid)
            {
                let user = await this.userService.validateUserEmail(signup.contactPerson.email);
                if (user) 
                {
                    
                    let result= new ResponseObj<any>();
                    result.message=`Email address already exist !! account cannot be created` ;
                    result.status=false;
                    result.result="";
                    result.code=409;
                    return result;
                }
                let model=new CreateCompanyDto();
                model.comapanyName=signup.company.comapanyName;
                model.address=signup.company.address;
        
                const response=await this.comapnyService.createCompany(model);
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
                        roleId:''
                        
                    };
                   
                    let response=await this.userService.createAdmins(userinfo,businessmodel);
                   
                    if(response.status){
                        let emaildata={token:response.result.id, name: response.result.firstName,url:process.env.EMAIL_ACTIVATIONLINK};
                        this.emailservice.sendmail(userinfo.email,'Ecorvids-Account','index.handlebars',emaildata);
                        
                        let result= new ResponseObj<any>();
                        result.message=`sign up completed check your email for activation link` ;
                        result.status=true;
                        result.result="";
                        result.code=200;
                        return result
                    }
                       
                }

            }
            return await this.payloadService.badRequestErrorMessage(validationResult);
          
          
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
    async activateAccount(token:string):Promise<ResponseObj<string>>{

        try{

            let response = await this.userService.activateuserAccount(token);
            return response;
        }
        catch(error){return error;}
    }
    
}
