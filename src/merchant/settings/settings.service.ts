import { Injectable, HttpStatus, Logger, HttpException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Business } from '../../entities/business.entity';
import { PayloadvalidationService } from '../../shared/payloadvalidation/payloadvalidation.service';
import { ApiResponseService } from '../../shared/response/apiResponse.service';
import { FiscalYear } from '../../entities/fiscalyear.entity';
import { FiscalYearDto } from '../../app-Dto/fiscalyear.dto';

@Injectable()
export class SettingsService {

    constructor(@InjectRepository(Business) private readonly businessRepository: Repository<Business>,
    @InjectRepository(FiscalYear) private readonly fiscalyearRepository: Repository<FiscalYear>,
    private readonly payloadService: PayloadvalidationService,
    private readonly apiResponseService: ApiResponseService) {

    }
    async CreatFiscalYear(model:FiscalYearDto,business:Business,createdby:string):Promise<any>{
        try{
            
            const duplicatecheck=await this.fiscalyearRepository.findOne({where:{business:business,name:model.name}});
            if(duplicatecheck){
                return this.apiResponseService.FailedBadRequestResponse(
                    `A record with the same name already exists!`,
                    HttpStatus.BAD_REQUEST, '');
            }
            const fiscalyear=new FiscalYear();
            fiscalyear.name=model.name;
            fiscalyear.startdate=model.startdate;
            fiscalyear.enddate=model.enddate;
            fiscalyear.isDisabled=false;
            fiscalyear.iscurrent=model.iscurrent;
            fiscalyear.createdby=createdby;
            fiscalyear.updatedby='';
            const dbresponse=await this.fiscalyearRepository.save(fiscalyear);
            return this.apiResponseService.SuccessResponse(
                `${dbresponse.name} has been created and activated`,
                HttpStatus.OK,dbresponse);

        }
        catch (error) {
            console.log(error)
            Logger.error(error);
            return new HttpException({
               message: 'Process error while executing operation:',
               code: 500, status: false
            },
               HttpStatus.INTERNAL_SERVER_ERROR);
         }
    }
    async GetCurrentFiscalYear(business:Business):Promise<any>{
        try{
            
            const fiscalyear=await this.fiscalyearRepository.findOne({where:{business:business,iscurrent:true}});
            return this.apiResponseService.SuccessResponse(
                `${fiscalyear.startdate} : ${fiscalyear.enddate}`,
                HttpStatus.OK,fiscalyear);

        }
        catch (error) {
            console.log(error)
            Logger.error(error);
            return new HttpException({
               message: 'Process error while executing operation:',
               code: 500, status: false
            },
               HttpStatus.INTERNAL_SERVER_ERROR);
         }
    }
}
