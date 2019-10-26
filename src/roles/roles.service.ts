import { Injectable, HttpException, HttpStatus} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, getRepository, DeleteResult } from 'typeorm';
import { Role, RoleUser } from '../entities/role.entity';
import { RoleDto, CreateRoleDto } from '../app-Dto/usermgr/role/role.dto';
import { ResponseObj } from '../shared/generic.response';
import { User } from '../entities/user.entity';


@Injectable()
export class RolesService {
    
    constructor(@InjectRepository(Role)private readonly roleRepository: Repository<Role>,
    @InjectRepository(User)private readonly userRepository: Repository<User>,
    @InjectRepository(RoleUser)private readonly roleuserRepository: Repository<RoleUser>) 
    {}
    async findAll(): Promise<ResponseObj<RoleDto[]>> 
    {
       try
       {
            let rolesDb: Array<RoleDto> = await this.roleRepository.find().then(as=>as.map(a=>({id:a.id,name:a.name})));
            let result= new ResponseObj<RoleDto[]>();
            result.message=`${rolesDb.length} roles retrived` ;
            result.status=true;
            result.result=rolesDb;
            return result
       }
       catch(err){return err;}
       
    }
    async createRole(roleDTO: CreateRoleDto): Promise<any> {
       try
       {   
            const {name} = roleDTO;
            const qb = getRepository(Role).createQueryBuilder('role').where('role.name = :name', { name });
            const role = await qb.getOne();
            if(role){
                const errors = {username: 'role name must be unique.'};
                throw new HttpException({message: 'Input data validation failed', errors}, HttpStatus.BAD_REQUEST);
            }

            let roleDb = this.roleRepository.create(roleDTO);
            return await this.roleRepository.save(roleDb);
       }
       catch(error){console.log(error);
        return new HttpException({message: 'Process error while executing operation:', code:500, status:false},HttpStatus.INTERNAL_SERVER_ERROR);}
    }
    
    async assignUserToRole(roleId:string,userId:string,createdby:string):Promise<any>{
        try{
            const userinfo=await this.userRepository.findOne({where:{id:userId,isDisabled:false}})
            if(!userinfo){
               
                let result= new ResponseObj<string>();
                result.message=`user Id: ${userId} does not exist or  disabled`;
                result.status=false;
                result.result='';
                return result;

            }
            const roleinfo=await this.roleRepository.findOne({where:{id:roleId,isDisabled:false}})
            if(!roleinfo){
               
                let result= new ResponseObj<string>();
                result.message=`role Id:${roleId} does not exist or  disabled`;
                result.status=false;
                result.result='';
                return result;

            }
            const checkduplicate=await this.roleuserRepository.findOne({where:{user:userinfo,role:roleinfo}});
            if(checkduplicate){
               
                let result= new ResponseObj<string>();
                result.message=`user Id: ${userId} already has role of ${roleinfo.name}`;
                result.status=false;
                result.result='';
                return result;

            }
            const roleuserRepository=this.roleuserRepository.create({createdby,isDisabled:false,updatedby:'',user:userinfo,role:roleinfo});
            const response= await this.roleuserRepository.save(roleuserRepository);
            
            let result= new ResponseObj<RoleUser>();
            result.message=`${roleinfo.name} has been assigned to ${userinfo.firstName}` ;
            result.status=true;
            result.result=response;
            return result;
        }
        catch(error){ console.log(error);
            return new HttpException({message: 'Process error while executing operation:', code:500, status:false},HttpStatus.INTERNAL_SERVER_ERROR);}
    }
   
   
}
