import * as jwt from 'jsonwebtoken';
import { Injectable, HttpException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseObj } from '../shared/generic.response';
import { IloginDto } from '../app-Dto/usermgr/login.dto';
import { Business } from '../entities/business.entity';
import { UserPremission } from '../entities/role.entity';
import { urlType } from '../enums/settings.enum';

@Injectable()
export class AuthService {
    private tokenExp = '2 days';
    
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Business)private readonly buisnessRepository: Repository<Business>,
        private readonly usersService: UsersService,
        @InjectRepository(UserPremission)private readonly user_permissionRepository: Repository<UserPremission>
     
    ) { }

    public async validateUser(userId: string) {
        return await this.usersService.validateUser(userId);
    }

    public async login(email, password):Promise<ResponseObj<any>> {

        if (!email) throw new HttpException('Email is required', 422);
        if (!password) throw new HttpException('Password is required', 422);

        const foundUser = await this.userRepository.findOne({email:email,emailConfirmed:true});
        if (!foundUser) throw new HttpException('User not found', 401);

        if(foundUser.business.IsActive!=true) throw new HttpException('Business account not yet activated', 401);
        if (!(await this.usersService.isValidPassword(foundUser, password))) throw new HttpException('User not found', 401);
       
        const permissions=await this.user_permissionRepository.find({where:{user:foundUser,isDisabled:false}});
        const token= await this.createToken(foundUser);
        let view=[];
        let api=[];
        for(let url of permissions){
            if(url.applicationroute.type==1)
            {view.push(url.applicationroute.url)}
             else{
                api.push(url.applicationroute.url)
             }
        }
        
        
        const expiresIn = 60 * 60;
        let data = {token: token.access_token, expire: expiresIn ,role:'',
        username:foundUser.username,
        views:view,
        apis:api};
        
        let result= new ResponseObj<any>();
        result.message=`Login was successful` ;
        result.status=true;
        result.result=data;
        return result;
    }

    private async createToken(user: User) {
     
        const data = {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            id: user.id,
            businessId:user.business.id,
            
        };
        const token = jwt.sign(data, process.env.SECRET, { expiresIn: this.tokenExp });

        return {
            
            access_token: token
        };
    }
}
