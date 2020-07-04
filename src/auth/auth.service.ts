import * as jwt from 'jsonwebtoken';
import { Injectable, HttpStatus, Logger, HttpException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseObj } from '../shared/generic.response';
import { UserPremission } from '../entities/role.entity';
import { PayloadvalidationService } from '../shared/payloadvalidation/payloadvalidation.service';
import { ApiResponseService } from '../shared/response/apiResponse.service';

@Injectable()
export class AuthService {
    private tokenExp = '2 days';
    
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly usersService: UsersService,
        @InjectRepository(UserPremission)private readonly user_permissionRepository: Repository<UserPremission>,
        private readonly payloadService: PayloadvalidationService,
        private readonly apiResponseService: ApiResponseService,
     
    ) { }

    public async validateUser(userId: string) {
        return await this.usersService.validateUser(userId);
    }

    public async login(email, password):Promise<any> {

        try{
            let validationResult = await this.payloadService.validateSignInAsync({email:email,password:password}); 
            if(validationResult.IsValid)
            {
                console.log('passed validation');
                const foundUser = await this.userRepository.findOne({email:email,emailConfirmed:true});
                if (!foundUser){
    
                    return this.apiResponseService.FailedBadRequestResponse(
                        `User does not exist`,
                        HttpStatus.UNAUTHORIZED, '');
                    
                }
                if (!(await this.usersService.isValidPassword(foundUser,password))){
                    return this.apiResponseService.FailedBadRequestResponse(
                        `User does not exist`,
                        HttpStatus.UNAUTHORIZED, '');
                }
                if(foundUser.business.isDisabled){

                    return this.apiResponseService.FailedBadRequestResponse(
                        `Authentication needs approval , please contact support team`,
                        HttpStatus.UNAUTHORIZED, '');
                }
                //const permissions=await this.user_permissionRepository.find({where:{user:foundUser,isDisabled:false}});
                const token= await this.createToken(foundUser);
                const expiresIn = 60 * 60;
                let data = {

                    token: token.access_token,
                    expire: expiresIn ,role:'',
                    username:foundUser.username,
                    views:[],
                    apis:[]
                };
                return this.apiResponseService.SuccessResponse(
                    `Login was successful`,
                    HttpStatus.OK,data);
                
            }
            return await this.payloadService.badRequestErrorMessage(validationResult);
        }
        catch(error){
         console.error('creatPurchaseHeader Error:',error.message);
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
     
        const data = {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            id: user.id,
            businessId:user.business.id,
            business:user.business,
            businesslocationId:'',//user.businesslocation.id?'':'',
            businesslocation:user.businesslocation
        };
        const token = jwt.sign(data, process.env.SECRET, { expiresIn: this.tokenExp });

        return {
            
            access_token: token
        };
    }
}