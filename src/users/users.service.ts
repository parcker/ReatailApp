import { Injectable, HttpException, Logger, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { ICreateUser } from './user.interface';
import * as bcrypt from 'bcrypt';
import { ResponseObj } from '../shared/generic.response';
import { Business } from '../entities/business.entity';
import { CreateNonAdminUser } from '../app-Dto/usermgr/signup.dto';
import { RoleUser, Role } from '../entities/role.entity';
import { EmailService } from '../shared/email/emailService';
import { ApiResponseService } from '../shared/response/apiResponse.service';

@Injectable()
export class UsersService {


    constructor(@InjectRepository(User)private readonly userRepository: Repository<User>,
    @InjectRepository(Business)private readonly businessRepository: Repository<Business> ,
    @InjectRepository(RoleUser)private readonly roleuserRepository: Repository<RoleUser>,
    @InjectRepository(Role)private readonly roleRepository: Repository<Role>,
    private readonly apiResponseService: ApiResponseService,
    private readonly emailservice:EmailService)
     { }

    async createBusinessSuperAdmins(userData: ICreateUser, businessInfo:Business): Promise<any> {
   
        try
        {

            const newUser = this.userRepository.create(userData);
            newUser.business=businessInfo;
            let response= await this.userRepository.save(newUser);
            if(response.hasId)
            {
                let result= new ResponseObj<User>();
                result.message=`create user completed` ;
                result.status=true;
                result.result=response;
                return result
            }
            let result= new ResponseObj<User>();
            result.message=`create user operation failed` ;
            result.status=false;
            result.result=response;
            return result
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
    
    async createNonAdminUser(createdby:string,model:CreateNonAdminUser): Promise<any> {
   
        try
        {
            
            let user = await this.validateUserEmail(model.email);
            if (user) 
            {  
                return this.apiResponseService.FailedBadRequestResponse(
                `Email address already exist !! account cannot be created`,
                HttpStatus.BAD_REQUEST,'');
               
            }
            const biz=await this.businessRepository.findOne({where:{id:model.businessId , isDisabled:false}});

            const bizlocation=biz.businessLocation.find(c=>c.id==model.businesslocationids);
            if (!bizlocation) 
            {  
                return this.apiResponseService.FailedBadRequestResponse(
                `Invalid business location Id selected`,
                HttpStatus.BAD_REQUEST,'');
               
            }
            const usermodel=new User();
            usermodel.business=biz;
            usermodel.firstName=model.firstName.trim(),
            usermodel.email=model.email.trim();
            usermodel.emailConfirmed=false;
            usermodel.lastName=model.lastName;
            usermodel.phonenumber=model.phonenumber,
            usermodel.password=model.password;
            usermodel.username=model.email;
            usermodel.twoFactorEnable=false;
            usermodel.businesslocation=bizlocation
            const response= await this.userRepository.save(usermodel);

            const roleuser=new RoleUser();
            roleuser.user=response;
            roleuser.role=await this.roleRepository.findOne({where:{id:model.roleId}})
            roleuser.createdby=createdby;
            roleuser.isDisabled=false;
            roleuser.updatedby='';
            const userrole_response=await this.roleuserRepository.save(roleuser);

            if(! userrole_response && !roleuser )
            {

                let emaildata={token:response.result.id, name: response.result.firstName,url:process.env.EMAIL_ACTIVATIONLINK};
                this.emailservice.sendmail(response.email,'Ecorvids-Account','index.handlebars',emaildata);

                return this.apiResponseService.SuccessResponse(
                    `create user operation completed , ${response.firstName + response.lastName}
                    has been assigned to Role : ${roleuser.role.name}`,
                    HttpStatus.OK,'');

            }
            return this.apiResponseService.SuccessResponse(
                `create user operation failed`,
                HttpStatus.OK,'');
        
        }
        catch(error)
        {   
            console.error('createNonAdminUser Error:',error.message);
            Logger.error(error);
         
            return new 
            HttpException({message: 'Process error while executing operation:',
            code:500, status:false},
            HttpStatus.INTERNAL_SERVER_ERROR);
        }
       
    }
    public async validateUser(userId: string): Promise<boolean> {
        const foundUser = await this.userRepository.findOne(userId);
        if (!foundUser) throw { err: 'Invalid user.' };

        return !!foundUser;
    }
    public async validateUserEmail(email: string): Promise<boolean> {

        const foundUser = await this.userRepository.findOne({ where: { email:email } });
        if (!foundUser) return false;
        return true;
    }
    public async activateuserAccount(token: string): Promise<ResponseObj<string>> {

        const foundUser = await this.userRepository.findOne({ where: { id:token } });
        if (!foundUser) 
        { 
            let result= new ResponseObj<string>();
            result.message=`Invalid/token` ;
            result.status=false;
            result.result="";
            return result
        }
        foundUser.emailConfirmed=true;
        await this.userRepository.save(foundUser);

        let result= new ResponseObj<string>();
        result.message=`account acctivated successfully` ;
        result.status=true;
        result.result="";
        return result
    }
    public async isValidPassword(user: User, password: string): Promise<boolean> {
        return await bcrypt.compare(password, user.password);
    }
}
