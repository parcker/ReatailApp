import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicationRoute } from '../../entities/role.entity';
import { urlType } from '../../enums/settings.enum';
import { ResponseObj } from '../../shared/generic.response';

@Injectable()
export class RoutesService {

    constructor(@InjectRepository(ApplicationRoute)private readonly applicationRouteRepository: Repository<ApplicationRoute>,) {
      

    }
    async createRoute(url:string,description:string,type:number,createdby:string):Promise<any>{
        try{

            console.log('route',type,url,description);
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
}
