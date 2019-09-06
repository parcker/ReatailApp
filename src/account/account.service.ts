import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ResponseObj } from '../shared/genericresponse';
import { SigupDto } from '../app-Dto/usermgr/signup.dto';
import { CompanyService } from '../company/company.service';
import { CreateCompanyDto } from '../app-Dto/usermgr/company/company.dto';

@Injectable()
export class AccountService {
    
    constructor(private readonly userService: UsersService,
        private readonly comapnyService: CompanyService) {}

    public async create(signup: SigupDto): Promise<ResponseObj<string>> {
      
        try
        {
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
                    number:signup.contactPerson.phonenumber
                };
                let response=await this.userService.create(userinfo);
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
