import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ResponseObj } from '../shared/genericresponse';
import { SigupDto } from '../app-Dto/usermgr/signup.dto';
import { CompanyService } from '../company/company.service';
import { CreateCompanyDto } from '../app-Dto/usermgr/company/company.dto';

@Injectable()
export class AccountService {
    
    constructor(private readonly userService: UsersService,private readonly comapnyService: CompanyService) {}

    public async create(signup: SigupDto): Promise<ResponseObj<string>> {
      
        try
        {
            let companydto=new CreateCompanyDto();
            companydto.comapanyName=signup.company.comapanyName;
            companydto.address=signup.company.address;
            var response=await this.comapnyService.createCompany(companydto);
            console.log('account.service 1', response);
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
                console.log('account.service 1', response);
                if(response.status){
                    
                    let result= new ResponseObj<string>();
                    result.message=`sign up completed` ;
                    result.status=true;
                    result.result="";
                    return result
                }
                   
            }
           

        }catch(error){return error;}
    }
}
