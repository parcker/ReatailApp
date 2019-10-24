import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicationRoute, UserPremission } from '../../entities/role.entity';
import { urlType } from '../../enums/settings.enum';
import { ResponseObj } from '../../shared/generic.response';
import { User } from '../../entities/user.entity';

@Injectable()
export class RoutesService {

    constructor(@InjectRepository(ApplicationRoute)private readonly applicationRouteRepository: Repository<ApplicationRoute>,
    @InjectRepository(User)private readonly userRepository: Repository<User>,
    @InjectRepository(UserPremission)private readonly user_permissionRepository: Repository<UserPremission>
    ) {
      

    }
    async createRoute(url:string,description:string,type:number,createdby:string):Promise<any>{
        try{

          
            const checkduplicate= await this.applicationRouteRepository.findOne({where:{url:url.toLowerCase()}});
            if(checkduplicate)
            {
                let result= new ResponseObj<string>();
                result.message=`${url} : url already exist` ;
                result.status=false;
                result.result='';
                return result;
            }
            const data={url,description,type,createdby,isDisabled:false,updatedby:''};
            const model=this.applicationRouteRepository.create(data);
            ;
            const response=await this.applicationRouteRepository.save(model);
            let result= new ResponseObj<ApplicationRoute>();
                result.message=`application route created` ;
                result.status=true;
                result.result=response;
                return result;
        }
        catch(error){
           console.log(error);
            return new HttpException('Process error while executing operation:',HttpStatus.INTERNAL_SERVER_ERROR)}
    }
    async updateRoute(url:string,description:string,type:number,updatedby:string):Promise<any>{}
    async getByRouteByType(type?:number):Promise<any>{

        try{
            const routes=await this.applicationRouteRepository.find({where:{Type:type,isDisabled:false}});
            if(!routes){

                let result= new ResponseObj<ApplicationRoute[]>();
                result.message=`No data found!` ;
                result.status=true;
                result.result=routes;
                return result;
            }

            let result= new ResponseObj<ApplicationRoute[]>();
                result.message=`data found!` ;
                result.status=true;
                result.result=routes;
                return result;
        }
        catch(error){
            console.log(error);
             return new HttpException('Process error while executing operation:',HttpStatus.INTERNAL_SERVER_ERROR)}
    }
    async deleteRouteById(Id:string,updatedby:string):Promise<any>{}
    async assignRouteToUser(Id:string,userId:string,createdby:string):Promise<any>{

        try{
            const user=await this.userRepository.findOne({where:{Id:userId,isDisabled:false,}});
            const routes=await this.applicationRouteRepository.findOne({where:{id:Id,isDisabled:false}});
            if(!routes)
            {
                let result= new ResponseObj<string>();
                result.message=`route information could be found with Id ${Id}!` ;
                result.status=true;
                result.result='';
                return result;
            }
            const checkduplicate=await this.user_permissionRepository.findOne({where:{applicationroute:routes ,user:user}});
            if(checkduplicate)
            {
                let result= new ResponseObj<string>();
                result.message=`permission already exist for user!` ;
                result.status=true;
                result.result='';
                return result;
            }
            const userpermission=this.user_permissionRepository.create({createdby,isDisabled:false,updatedby:'',user:user,applicationroute:routes})
            let response= await this.user_permissionRepository.save(userpermission);
           
            let result= new ResponseObj<UserPremission>();
            result.message=`${routes.description} with route ${routes.url} has been assigned to ${user.firstName}` ;
            result.status=true;
            result.result=response;
            return result;
        }
        catch(error){
            console.log(error);
             return new HttpException('Process error while executing operation:',HttpStatus.INTERNAL_SERVER_ERROR)}
    }
}
