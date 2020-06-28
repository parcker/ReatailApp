import { Injectable, HttpStatus, Logger, HttpException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Business } from '../../entities/business.entity';
import { PayloadvalidationService } from '../../shared/payloadvalidation/payloadvalidation.service';
import { ApiResponseService } from '../../shared/response/apiResponse.service';
import { FiscalYear } from '../../entities/fiscalyear.entity';
import { FiscalYearDto } from '../../app-Dto/fiscalyear.dto';
import { PaymentMode } from '../../entities/paymentmode.entity';
import { PaymentTerm } from '../../entities/paymentterm.entity';
import { CreatePaymentModeDto } from '../../app-Dto/paymentmode.dto';
import { CreatePaymentTermDto } from '../../app-Dto/paymentterm.dto';

@Injectable()
export class SettingsService {
    GetPaymentMode(arg0: { where: { id: string; business: Business; isDisabled: boolean; }; }) {
        throw new Error("Method not implemented.");
    }

    constructor(@InjectRepository(Business) private readonly businessRepository: Repository<Business>,
    @InjectRepository(PaymentMode) private readonly paymentmodeRepository: Repository<PaymentMode>,
    @InjectRepository(PaymentTerm) private readonly paymenttermRepository: Repository<PaymentTerm>,
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
    async CreatPaymentMode(model:CreatePaymentModeDto,business:Business,createdby:string):Promise<any>{
        try{
            
            const duplicatecheck=await this.paymentmodeRepository.findOne({where:{business:business,name:model.name}});
            if(duplicatecheck){
                return this.apiResponseService.FailedBadRequestResponse(
                    `A record with the same name already exists!`,
                    HttpStatus.BAD_REQUEST, '');
            }
            const paymentmode=new PaymentMode();
            paymentmode.name=model.name;
            paymentmode.isDisabled=false;
            paymentmode.business=business;
            paymentmode.createdby=createdby;
            paymentmode.updatedby='';
            const dbresponse=await this.paymentmodeRepository.save(paymentmode);
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
    async CreatPaymentTerm(model:CreatePaymentTermDto,business:Business,createdby:string):Promise<any>{
        try{
            
            const duplicatecheck=await this.paymenttermRepository.findOne({where:{business:business,noofdays:model.noofdays}});
            if(duplicatecheck){
                return this.apiResponseService.FailedBadRequestResponse(
                    `A record with the same name already exists!`,
                    HttpStatus.BAD_REQUEST, '');
            }
            const paymentterm=new PaymentTerm();
            paymentterm.name=model.name;
            paymentterm.noofdays=model.noofdays;
            paymentterm.isDisabled=false;
            paymentterm.business=business;
            paymentterm.createdby=createdby;
            paymentterm.updatedby='';
            const dbresponse=await this.paymenttermRepository.save(paymentterm);
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
    async GetCurrentPaymentModes(business:Business):Promise<any>{
        try{
            
            const paymentmodes=await this.paymentmodeRepository.find({where:{business:business}});
            return this.apiResponseService.SuccessResponse(
                `${paymentmodes.length}  payment mode data found`,
                HttpStatus.OK,paymentmodes);

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
    async GetCurrentPaymentTerms(business:Business):Promise<any>{
        try{
            
            const paymentterms=await this.paymenttermRepository.find({where:{business:business}});
            return this.apiResponseService.SuccessResponse(
                `${paymentterms.length}  payment term data found`,
                HttpStatus.OK,paymentterms);

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
    async GetCurrentPaymentModeById(business:Business,id:string):Promise<any>{
        try{
            
            const paymentmode=await this.paymentmodeRepository.findOne({where:{business:business,id:id}});
            return this.apiResponseService.SuccessResponse(
                `${paymentmode}  payment mode data found`,
                HttpStatus.OK,paymentmode);

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
    async GetCurrentPaymentTermById(business:Business,id:string):Promise<any>{
        try{
            
            const paymentterm=await this.paymenttermRepository.findOne({where:{business:business,id:id}});
            return this.apiResponseService.SuccessResponse(
                `${paymentterm}  payment term data found`,
                HttpStatus.OK,paymentterm);

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
