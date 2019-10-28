import { Injectable, HttpException, HttpStatus} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, getRepository, DeleteResult } from 'typeorm';
import { Role, RoleUser } from '../entities/role.entity';
import { RoleDto, CreateRoleDto } from '../app-Dto/usermgr/role/role.dto';
import { ResponseObj } from '../shared/generic.response';
import { User } from '../entities/user.entity';
import { Business } from '../entities/business.entity';


@Injectable()
export class RolesService {
    
    constructor(@InjectRepository(Role)private readonly roleRepository: Repository<Role>,
    @InjectRepository(User)private readonly userRepository: Repository<User>,
    @InjectRepository(RoleUser)private readonly roleuserRepository: Repository<RoleUser>,
    @InjectRepository(Business)private readonly businessRepository: Repository<Business>) 
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
    async createRole(roleDTO: CreateRoleDto,createdby:string,businessId:string): Promise<any> {
       try
       {  
             const business= await this.businessRepository.findOne({where:{id:businessId}});
             if(!business) {
                let result= new ResponseObj<string>();
                result.message=`invalid or business Id , no business data found`;
                result.status=false;
                result.result='';
                return result;
             }
             const {name}=roleDTO;
           
            
             const checkduplicate=await this.roleRepository.findOne({where:{name:name,business:business}});
             if(checkduplicate){
                
                let result= new ResponseObj<string>();
                result.message=` ${name} role name already ! go and delete or edit.`;
                result.status=false;
                result.result='';
                return result;
            }
            var model=new Role();
            model.name=roleDTO.name;
            
            model.createdby=createdby;
            model.isDisabled=false;
            model.updatedby='';
            model.business=business;

            let roleDb = this.roleRepository.create(model);
            var response= await this.roleRepository.save(roleDb);
            let result= new ResponseObj<Role>();
            result.message=`${response.name} has been created and activated` ;
            result.status=true;
            result.result=response;
            return result;
       }
       catch(error){console.log(error);
        return new HttpException({message: 'Process error while executing operation:', code:500, status:false},HttpStatus.INTERNAL_SERVER_ERROR);}
    }
    
    async assignUserToRole(roleId:string,userIds:string[],createdby:string):Promise<any>{
        try{

            let successfullyassignedRole=[];
            let inSameRole=[];
            let invalideuserids=[];
         

            const roleinfo=await this.roleRepository.findOne({where:{id:roleId,isDisabled:false}})
            if(!roleinfo){
               
                let result= new ResponseObj<string>();
                result.message=`role Id:${roleId} does not exist or  disabled`;
                result.status=false;
                result.result='';
                return result;

            }
            for(var userId of userIds ){

                const userinfo=await this.userRepository.findOne({where:{id:userId,isDisabled:false}})
                if(!userinfo){invalideuserids.push(userId);continue;}
                const checkduplicate=await this.roleuserRepository.findOne({where:{user:userinfo,role:roleinfo}});
                if(checkduplicate){inSameRole.push(checkduplicate);continue;}

                const roleuserRepository=this.roleuserRepository.create({createdby,isDisabled:false,updatedby:'',user:userinfo,role:roleinfo});
                const response= await this.roleuserRepository.save(roleuserRepository);
                successfullyassignedRole.push(response);

            }
       
            let result= new ResponseObj<RoleUser[]>();
            result.message=`${successfullyassignedRole.length} users has been assigned to role ${roleinfo.name}, and ${inSameRole.length} user(s) were found in same role` ;
            result.status=true;
            result.result=successfullyassignedRole;
            return result;
          
        }
        catch(error){ console.log(error);
            return new HttpException({message: 'Process error while executing operation:', code:500, status:false},HttpStatus.INTERNAL_SERVER_ERROR);}
    }
   
   
}
