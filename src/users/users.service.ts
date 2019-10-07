import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { ICreateUser } from './user.interface';
import * as bcrypt from 'bcrypt';
import { ResponseObj } from '../shared/generic.response';
import { Business } from '../entities/business.entity';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User)private readonly userRepository: Repository<User>, )
     { }

    async create(userData: ICreateUser, businessInfo:Business): Promise<ResponseObj<User>> {
   
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
            let result= new ResponseObj<User>();
            result.message=error;
            result.status=false;
            result.result=error;
            return result
        }
       
    }
    async createNonAdminUser(userData: ICreateUser, businessId:string,userId:string): Promise<ResponseObj<string>> {
   
        try
        {

            const newUser = this.userRepository.create(userData);
            //newUser.business=businessInfo;
            let response= await this.userRepository.save(newUser);
            if(response.hasId)
            {
                let result= new ResponseObj<string>();
                result.message=`create user completed` ;
                result.status=true;
                result.result="";
                return result
            }
            let result= new ResponseObj<string>();
            result.message=`create user operation failed` ;
            result.status=false;
            result.result="";
            return result
        }
        catch(error)
        {   
            let result= new ResponseObj<string>();
            result.message="";
            result.status=false;
            result.result=error;
            return result
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
    public async isValidPassword(user: User, password: string): Promise<boolean> {
        return await bcrypt.compare(password, user.password);
    }
}
