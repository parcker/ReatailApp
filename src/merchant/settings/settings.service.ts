import { Injectable, HttpStatus, Logger, HttpException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Business } from '../../entities/business.entity';
import { PayloadvalidationService } from '../../shared/payloadvalidation/payloadvalidation.service';
import { ApiResponseService } from '../../shared/response/apiResponse.service';
import { FiscalYear } from '../../entities/fiscalyear.entity';
import { FiscalYearDto } from '../../app-Dto/merchant/fiscalyear.dto';
import { PaymentMode } from '../../entities/paymentmode.entity';
import { PaymentTerm } from '../../entities/paymentterm.entity';
import { CreatePaymentModeDto } from '../../app-Dto/merchant/paymentmode.dto';
import { CreatePaymentTermDto } from '../../app-Dto/merchant/paymentterm.dto';
import { Tax } from '../../entities/tax.entity';
import { TaxDto } from '../../app-Dto/merchant/tax.dto';

@Injectable()
export class SettingsService 
{
   

    constructor(@InjectRepository(Business) private readonly businessRepository: Repository<Business>,
    @InjectRepository(PaymentMode) private readonly paymentmodeRepository: Repository<PaymentMode>,
    @InjectRepository(PaymentTerm) private readonly paymenttermRepository: Repository<PaymentTerm>,
    @InjectRepository(Tax) private readonly taxRepository: Repository<Tax>,
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
            fiscalyear.business=business
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
    async GetPaymentMode(arg0: { where: { id: string; business: Business; isDisabled: boolean; }; }) {
        throw new Error("Method not implemented.");
    }
    /// PAyment Temrs and Mode
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

    ////Tax Operation
    async CreatTaxforBusiness(request:TaxDto,business:Business,createdby:string):Promise<any>{
        try{
            
            let validation=await this.payloadService.validateTaxAsync(request);
            if(validation.IsValid){
                if(await this.taxRepository.findOne({where:{name:request.name,business:business}})){

                    return this.apiResponseService.FailedBadRequestResponse(
                        `${request.name} already exist `,
                        HttpStatus.BAD_REQUEST,'');
                }
                let tax =new Tax();
                tax.name=request.name;
                tax.code=request.code.toUpperCase();
                tax.business=business;
                tax.createdby=createdby;
                tax.isDisabled=false;
                tax.updatedby="";
                tax.value=request.value;
                const dbresponse=await this.taxRepository.save(tax);
                return this.apiResponseService.SuccessResponse(
                    `${dbresponse.name} has been created and activated`,
                    HttpStatus.OK,dbresponse);
            }
            return await this.payloadService.badRequestErrorMessage(validation);
          

        }
        catch (error) {
            console.log('CreatSeedTax Error',error)
           
            return new HttpException({
               message: 'Process error while executing operation:',
               code: 500, status: false
            },
               HttpStatus.INTERNAL_SERVER_ERROR);
         }
    }
    async GettaxbyBusiness(business:Business):Promise<any>{
        try{
            
            const taxs=await this.taxRepository.find({where:{business:business}});
            return this.apiResponseService.SuccessResponse(
                `${taxs.length}  tax data found`,
                HttpStatus.OK,taxs);

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
    async UpdateTaxforBusiness(request:TaxDto,taxId:string,business:Business,updatedby:string):Promise<any>{
        try{
            
            let validation=await this.payloadService.validateTaxAsync(request);
            if(validation.IsValid)
            {
                let  getexistingtax=await this.taxRepository.findOne({where:{id:taxId,business:business}})
                if(!getexistingtax){

                    return this.apiResponseService.FailedBadRequestResponse(
                        `${request.name} does not exist  `,
                        HttpStatus.BAD_REQUEST,'');

                }

                if(await this.taxRepository.findOne({where:{id:taxId,name:request.name,business:business}})){

                    return this.apiResponseService.FailedBadRequestResponse(
                        `${request.name} tax information already exist `,
                        HttpStatus.BAD_REQUEST,'');
                }

                getexistingtax.name=request.name;
                getexistingtax.code=request.code.toUpperCase();
                getexistingtax.value=request.value;
                getexistingtax.updatedby=updatedby;
                const dbresponse=await this.taxRepository.save(getexistingtax);

                return this.apiResponseService.SuccessResponse(
                    `${dbresponse.name} has been created and activated`,
                    HttpStatus.OK,dbresponse);
            }
            return await this.payloadService.badRequestErrorMessage(validation);
          

        }
        catch (error) {
            console.log('UpdateTaxforBusiness Error',error)
           
            return new HttpException({
               message: 'Process error while executing operation:',
               code: 500, status: false
            },
               HttpStatus.INTERNAL_SERVER_ERROR);
         }
    }


}
