import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicationRoute, UserPremission } from '../../entities/role.entity';
import { urlType } from '../../enums/settings.enum';
import { ResponseObj } from '../../shared/generic.response';
import { User } from '../../entities/user.entity';
import { numberTypeAnnotation } from 'babel-types';

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
    async assignRouteToUser(Ids:string[],userId:string,createdby:string):Promise<any>{

        try{
            let processingCount=0;
            let duplicateCount=0;
            let datasresponse=[];
            const user=await this.userRepository.findOne({where:{Id:userId,isDisabled:false,}});
            for(let a of Ids)
            {
                const routes=await this.applicationRouteRepository.findOne({where:{id:a,isDisabled:false}});
                const checkduplicate=await this.user_permissionRepository.findOne({where:{applicationroute:routes ,user:user}});
                if(checkduplicate)
                {   duplicateCount+=1;
                    continue;
                }
                const userpermission=this.user_permissionRepository.create({createdby,isDisabled:false,updatedby:'',user:user,applicationroute:routes});
                let response= await this.user_permissionRepository.save(userpermission);
                processingCount+=1;
                datasresponse.push(response);
            }
            let result= new ResponseObj<UserPremission[]>();
            result.message=`${processingCount} application routes has been assigned to ${user.firstName} and ${duplicateCount} was found as duplicate` ;
            result.status=true;
            result.result=datasresponse;
            return result;
        }
        catch(error){
            console.log(error);
             return new HttpException('Process error while executing operation:',HttpStatus.INTERNAL_SERVER_ERROR)}
    }
}
