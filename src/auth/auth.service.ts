import * as jwt from 'jsonwebtoken';
import { Injectable, HttpException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseObj } from '../shared/generic.response';
import { IloginDto } from '../app-Dto/usermgr/login.dto';

@Injectable()
export class AuthService {
    private tokenExp = '2 days';

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly usersService: UsersService,
     
    ) { }

    public async validateUser(userId: string) {
        return await this.usersService.validateUser(userId);
    }

    public async login(email, password):Promise<ResponseObj<IloginDto>> {
        if (!email) throw new HttpException('Email is required', 422);
        if (!password) throw new HttpException('Password is required', 422);

        const foundUser = await this.userRepository.findOne({ email:email,emailConfirmed: true  });
        if (!foundUser) throw new HttpException('User not found', 401);
        if (!(await this.usersService.isValidPassword(foundUser, password))) throw new HttpException('User not found', 401);
        const token= await this.createToken(foundUser);
        
        let data = {token: token.access_token, expire: 100,role:'',username:foundUser.username};

        let result= new ResponseObj<IloginDto>();
        result.message=`Login was successful` ;
        result.status=true;
        result.result=data;
        return result;
    }

    private async createToken(user: User) {
       console.log('businessinfo:'+user.business.name);
        const data = {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            id: user.id,
            businessId:user.business.id
        };
        const token = jwt.sign(data, process.env.SECRET, { expiresIn: this.tokenExp });

        return {
            
            access_token: token
        };
    }
}
