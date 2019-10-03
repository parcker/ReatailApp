import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ResponseObj } from '../shared/generic.response';
import { SigupDto } from '../app-Dto/usermgr/signup.dto';
import { CompanyService } from '../company/company.service';
import { CreateCompanyDto } from '../app-Dto/usermgr/company/company.dto';
import {EmailService} from '../shared/emailService';

@Injectable()
export class AccountService {
    
    constructor(private readonly userService: UsersService,private readonly comapnyService: CompanyService) {}

    public async create(signup: SigupDto): Promise<ResponseObj<string>> {
      
        try
        {
            let user = await this.userService.validateUserEmail(signup.contactPerson.email);
            if (user) 
            {
                
                let result= new ResponseObj<string>();
                result.message=`Email address already exist !! account cannot be created` ;
                result.status=false;
                result.result="";
                return result;
            }

            let companydto=new CreateCompanyDto();
            companydto.comapanyName=signup.company.comapanyName;
            companydto.address=signup.company.address;
            var response=await this.comapnyService.createCompany(companydto);

            
            if(response.status)
            {

                let userinfo = {email: signup.contactPerson.email, 
                    firstName:signup.contactPerson.firstName,
                    lastName:signup.contactPerson.lastName,
                    password:signup.contactPerson.password,
                    phonenumber:signup.contactPerson.phonenumber,
                    username:signup.contactPerson.email,
                    emailConfirmed: false,
                    twoFactorEnable:false,
                    accessFailedCount:0,
                    
                };
                let response=await this.userService.create(userinfo);
               
                if(response.status){
                    
                    let emailservice=new EmailService();
                    emailservice.sendmail(
                        'account-76337a@inbox.mailtrap.io',userinfo.email,'Account Activation',
                        '<h1>Have the most fun you can in a car!</h1><p>Get your <b>Tesla</b> today!</p>')
                    let result= new ResponseObj<string>();
                    result.message=`sign up completed check your email for activation link` ;
                    result.status=true;
                    result.result="";
                    return result
                }
                   
            }
           

        }
        catch(error){return error;}
    }
}
