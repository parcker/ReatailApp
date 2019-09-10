import { Injectable, HttpException, HttpStatus} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, getRepository, DeleteResult } from 'typeorm';
import { Role } from '../entities/role.entity';
import { RoleDto, CreateRoleDto } from '../app-Dto/usermgr/role/role.dto';
import { ResponseObj } from '../shared/genericresponse';


@Injectable()
export class RolesService {
    
    constructor(@InjectRepository(Role)private readonly roleRepository: Repository<Role>,) 
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
    async createRole(roleDTO: CreateRoleDto): Promise<RoleDto> {
       try
       {   
            const {name} = roleDTO;
            const qb = await getRepository(Role).createQueryBuilder('role').where('role.name = :name', { name });
            const role = await qb.getOne();
            if(role){
                const errors = {username: 'role name must be unique.'};
                throw new HttpException({message: 'Input data validation failed', errors}, HttpStatus.BAD_REQUEST);
            }

            let roleDb = this.roleRepository.create(roleDTO);
             return await this.roleRepository.save(roleDb);
       }
       catch(err){return err;}
    }
    
   
   
}
