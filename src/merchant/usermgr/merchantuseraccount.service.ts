import { Injectable, HttpException, Logger, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { Business, BusinessLocation } from '../../entities/business.entity';
import { MerchantUserDto } from '../../app-Dto/usermgr/signup.dto';
import { RoleUser, Role } from '../../entities/role.entity';
import { EmailService } from '../../shared/email/emailService';
import { ApiResponseService } from '../../shared/response/apiResponse.service';
import { PayloadvalidationService } from '../../shared/payloadvalidation/payloadvalidation.service';
import { SignUpMagicDto } from '../../app-Dto/usermgr/signupmagiclink.dto';
import { UserType } from '../../enums/settings.enum';


@Injectable()
export class MerchantuseraccountService {
    constructor(
    @InjectRepository(User)private readonly userRepository: Repository<User>,
    @InjectRepository(BusinessLocation)private readonly businesslocationRepository: Repository<BusinessLocation> ,
    private readonly apiResponseService: ApiResponseService,
    private readonly emailservice:EmailService,
    private readonly payloadService:PayloadvalidationService)
    { }
    async createMerchantuser(model:MerchantUserDto): Promise<any> {
   
        try
        {
            let validationResult = await this.payloadService.validateMerchantUserAsync(model);
            if (validationResult.IsValid) {
                
                let userinfo=await this.userRepository.findOne({where:{siguptoken:model.token,emailConfirmed:false}});
                if (!userinfo) 
                {  
                    return this.apiResponseService.FailedBadRequestResponse(
                    `Invalid user sign-up request token Id`,
                    HttpStatus.BAD_REQUEST,'');
                
                }
                userinfo.firstName=model.firstName;
                userinfo.lastName=model.lastName;
                userinfo.phonenumber=model.phonenumber;
                userinfo.updatedby=userinfo.email;
                userinfo.password=await bcrypt.hash(model.password, Number(process.env.DEFAULT_SALT_ROUNDS).valueOf())
                userinfo.siguptoken='';
                const response= await this.userRepository.save(userinfo);
                if(response)
                {
                    
                    let emaildata={token:response.id, name: response.firstName,url:process.env.EMAIL_ACTIVATIONLINK};
                   this.emailservice.sendmail(response.email,'Ecorvids-Account','index.handlebars',emaildata);
                    return this.apiResponseService.SuccessResponse(
                        `create user operation completed , ${response.firstName + response.lastName}`,
                        HttpStatus.OK,'');
    
                }
                return this.apiResponseService.FailedBadRequestResponse(
                    `create user operation failed`,
                    HttpStatus.INTERNAL_SERVER_ERROR,'');
            }
            return await this.payloadService.badRequestErrorMessage(validationResult);
        
            
        
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
    async sendsignuplink(model:SignUpMagicDto,createdby:string):Promise<any>{
        try
        {
           
           
            const foundUser = await this.userRepository.findOne({ where: { email:model.email} });
            if (foundUser && foundUser.emailConfirmed) 
            {  
                return this.apiResponseService.FailedBadRequestResponse(
                `Email address already exist !! account cannot be created`,
                HttpStatus.BAD_REQUEST,'');
                
            }
            if (foundUser && foundUser.emailConfirmed==false && (foundUser.siguptoken!==null || foundUser.siguptoken!=='')) 
            {  
                let emaildata={token:foundUser.siguptoken, name: model.name,url:process.env.MAGIC_LINK};
                this.emailservice.sendmail(model.email,'Ecorvids Magic link','signup.handlebars',emaildata);
                return this.apiResponseService.SuccessResponse(
                    `magic link sent to , ${model.email}`,
                    HttpStatus.OK,'');
                
            }
            let bizlocation=await this.businesslocationRepository.findOne({
                where:{id:model.businesslocationId , isDisabled:false},
                relations: ['business']});
                console.log('=======>***',bizlocation);
            
            if (!bizlocation) 
            {  
                return this.apiResponseService.FailedBadRequestResponse(
                `Invalid business location Id selected`,
                HttpStatus.BAD_REQUEST,'');
            
            }
            console.log('Biz and location ===>',bizlocation)
            let usermodel= await this.returnuserModel(model,bizlocation,createdby);
            usermodel.password='Default';
            usermodel.siguptoken=uuidv4();
            usermodel.business=bizlocation.business;
            usermodel.businesslocation=bizlocation;
            usermodel.userType=UserType.merchantuser;
            const response= await this.userRepository.save(usermodel);
            if(response)
            {
                let emaildata={token:usermodel.siguptoken, name: model.name,url:process.env.MAGIC_LINK};
                this.emailservice.sendmail(model.email,'Ecorvids Magic link','signup.handlebars',emaildata);
                return this.apiResponseService.SuccessResponse(
                    `magic link sent to , ${model.email}`,
                    HttpStatus.OK,'');
            }
           

        }
        catch(error)
        {   
            console.error('sendsignuplink Error:',error.message);
            Logger.error(error);
         
            return new 
            HttpException({message: 'Process error while executing operation:',
            code:500, status:false},
            HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    public async validateUserEmail(email: string): Promise<boolean> {

        const foundUser = await this.userRepository.findOne({ where: { email:email } });
        if (!foundUser) return false;
        return true;
    }
    public async isValidPassword(user: User, password: string): Promise<boolean> {
        return await bcrypt.compare(password, user.password);
    }
    async returnuserModel(model:any,bizinfo:BusinessLocation,createdby:string):Promise<User>{

        let usermodel=new User();
       
        usermodel.firstName=model.firstName?'':'';
        usermodel.email=model.email;
        usermodel.emailConfirmed=false;
        usermodel.lastName=model.lastName?'':'';
        usermodel.phonenumber=model.phonenumber?'':'',
    //     usermodel.password=model.password;
         usermodel.createdby=createdby;
         usermodel.isDisabled=true;
         usermodel.accessFailedCount=0;
         usermodel.username=model.email;
         usermodel.twoFactorEnable=false;
        
       return usermodel;
    }
}
