import * as jwt from 'jsonwebtoken';
import { Injectable, HttpStatus, Logger, HttpException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPremission } from '../entities/role.entity';
import { PayloadvalidationService } from '../shared/payloadvalidation/payloadvalidation.service';
import { ApiResponseService } from '../shared/response/apiResponse.service';
import { UserType } from '../enums/settings.enum';
import { LoginDto } from './auth.dto';

@Injectable()
export class AuthService {
    private tokenExp = '2 days';
    
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
      
        @InjectRepository(UserPremission)private readonly user_permissionRepository: Repository<UserPremission>,
        private readonly payloadService: PayloadvalidationService,
        private readonly apiResponseService: ApiResponseService,
     
    ) { }

    public async validateUser(userId: string) {
        const foundUser = await this.userRepository.findOne(userId);
        if (!foundUser) throw { err: 'Invalid user.' };

        return !!foundUser;
    }

    public async login(model:LoginDto):Promise<any> {

        try{
            let validationResult = await this.payloadService.validateSignInAsync(model); 
            if(validationResult.IsValid)
            {
              
                const foundUser = await this.userRepository.find({
                    where:{email:model.email,emailConfirmed:true},
                    relations: ['business','businesslocation']});

                
                if (!foundUser ||foundUser.length==0 ){
    
                    return this.apiResponseService.FailedBadRequestResponse(
                        `User does not exist`,
                        HttpStatus.UNAUTHORIZED, '');
                    
                }
                
                if (!(await this.isValidPassword(foundUser[0],model.password))){
                    return this.apiResponseService.FailedBadRequestResponse(
                        `Password  or username is incorrect`,
                        HttpStatus.UNAUTHORIZED, '');
                }
               
                if(foundUser[0].userType!==UserType.admin){
                    
                    if(foundUser[0].business.isDisabled){

                        return this.apiResponseService.FailedBadRequestResponse(
                            `Authentication needs approval , please contact support team`,
                            HttpStatus.UNAUTHORIZED, '');
                    }
                }
              
                //const permissions=await this.user_permissionRepository.find({where:{user:foundUser,isDisabled:false}});
                const token= await this.createToken(foundUser[0]);
                const expiresIn = 60 * 60;
                let data = {

                    token: token.access_token,
                    expire: expiresIn ,role:'',
                    username:foundUser[0].username,
                    views:[],
                    apis:[],
                    usertype:token.usertype
                };
                return this.apiResponseService.SuccessResponse(
                    `Login was successful`,
                    HttpStatus.OK,data);
                
            }
            return await this.payloadService.badRequestErrorMessage(validationResult);
        }
        catch(error){
         console.error('login Error:',error.message);
            Logger.error(error);
            return new HttpException({
            message: 'Process error while executing operation:',
            code: 500, status: false
            },
           HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }
    public async validateUserEmail(email: string): Promise<boolean> {

        const foundUser = await this.userRepository.findOne({ where: { email:email } });
        if (!foundUser) return false;
        return true;
    }
    private async createToken(user: User) {
      
        var type: UserType = user.userType;
       
        const data = {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            id: user.id,
            businessId:'',
            business:null,
            businesslocationId:'',
            businesslocation:null,
            userType:UserType[type]
           
        };
        
        if(user.userType===UserType.merchant){
            data.business=user.business;
            data.businessId= user.business.id;

        }
        if(user.userType===UserType.merchantuser){
            data.business=user.business;
            data.businessId= user.business.id;
            data.businesslocationId=user.businesslocation.id;
            data.businesslocation=user.businesslocation;

        }
        console.log('passed all authorization',data);
        const token = jwt.sign(data, process.env.SECRET, { expiresIn: this.tokenExp });

        return {
            
            access_token: token,
            usertype:UserType[type]
        };
    }
    public async isValidPassword(user: User, password: string): Promise<boolean> {
        
        return await bcrypt.compare(password,user.password);
    }
}
