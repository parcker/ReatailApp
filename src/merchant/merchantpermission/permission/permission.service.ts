import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MarchantModuleDto } from '../../../app-Dto/merchant/merchantpermission.dto';
import { MarchantRoleDto, UpdateMarchantRoleDto } from '../../../app-Dto/merchant/merchantrole.dto';
import { AddMarchantUserRoleDto, UpdateMarchantUserRoleDto } from '../../../app-Dto/merchant/merchantuserrole.dto';
import { Business } from '../../../entities/business.entity';
import { MerchantModule, MerchantPermission, MerchantRole, MerchantRoleUser } from '../../../entities/merchantpermission.entity';
import { User } from '../../../entities/user.entity';
import { ResponseObj } from '../../../shared/generic.response';
import { PayloadvalidationService } from '../../../shared/payloadvalidation/payloadvalidation.service';
import { ApiResponseService } from '../../../shared/response/apiResponse.service';
@Injectable()
export class MercchantUserPermissionService {

    constructor(
    @InjectRepository(Business) private readonly businessRepository: Repository<Business>,
    @InjectRepository(MerchantPermission) private readonly merchantpermissionRepository: Repository<MerchantPermission>,
    @InjectRepository(MerchantRoleUser) private readonly merchantRoleUserRepository: Repository<MerchantRoleUser>,
    @InjectRepository(MerchantRole) private readonly merchantroleRepository: Repository<MerchantRole>,
    @InjectRepository(MerchantModule) private readonly merchantModuleRepository: Repository<MerchantModule>,
    
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly payloadService: PayloadvalidationService,
    private readonly apiResponseService: ApiResponseService) { }
  
    async creatMerchantUserPermission( business: Business): Promise<any> {

 
    }

    ////Merchant User Role Setup
    async creatMerchantUserRole(model:MarchantRoleDto ,business: Business, createdby:string): Promise<any> {
      try{

        let validationResult = await this.payloadService.validateCreateMerchantUserRoleAsync(model);
        if(validationResult.IsValid){

            let checkduplicate = await this.merchantroleRepository.findOne({ where: { name: model.name,business:business } });
            if (checkduplicate) {

                return this.apiResponseService.FailedBadRequestResponse(
                    `duplicate merchant role  name found ${model.name}`,
                    HttpStatus.BAD_REQUEST, '');

            }
            let merchantrole=new MerchantRole();
            merchantrole.name=model.name;
            merchantrole.business=business;
            merchantrole.createdby=createdby;
            const dbresponse = await this.merchantroleRepository.save(model);
            if(dbresponse){
                return this.apiResponseService.SuccessResponse(
                    `${dbresponse.name} merchant role has been created and activated`,
                    HttpStatus.OK, dbresponse);
            }
            console.log('creatMerchantUserRole Error Message', dbresponse, Date.now());
            return new
            HttpException({
                message: 'Process error while executing operation:',
                code: 500, status: false
            },HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return await this.payloadService.badRequestErrorMessage(validationResult);

      }
      catch (error) {
        console.log('creatMerchantUserRole Error Message', error, Date.now())
        Logger.error(error);
        return new
            HttpException({
                message: 'Process error while executing operation:',
                code: 500, status: false
            },
        HttpStatus.INTERNAL_SERVER_ERROR);
    }
 
    }
    async updateMerchantUserRole(model:UpdateMarchantRoleDto ,business: Business,updatedby:string): Promise<any> {
        try{
  
          let validationResult = await this.payloadService.validateUpdateMerchantUserRoleAsync(model);
          if(validationResult.IsValid){
  
              let merchantrole = await this.merchantroleRepository.findOne({ where: { id: model.id,business:business } });
              if (!merchantrole) {
  
                  return this.apiResponseService.FailedBadRequestResponse(
                      `Merchant role name found ${model.name}`,
                      HttpStatus.BAD_REQUEST, '');
  
              }
              merchantrole.name=model.name;
              merchantrole.updatedby = updatedby;;
  
              const dbresponse = await this.merchantroleRepository.save(model);
              if(dbresponse){
                  return this.apiResponseService.SuccessResponse(
                      `${dbresponse.name} merchant role has been created and activated`,
                      HttpStatus.OK, dbresponse);
              }
              console.log('creatMerchantUserRole Error Message', dbresponse, Date.now())
              return new
              HttpException({
                  message: 'Process error while executing operation:',
                  code: 500, status: false
              },HttpStatus.INTERNAL_SERVER_ERROR);
          }
          return await this.payloadService.badRequestErrorMessage(validationResult);

        }
        catch (error) {
          console.log('creatMerchantUserRole Error Message', error, Date.now())
          Logger.error(error);
          return new
              HttpException({
                  message: 'Process error while executing operation:',
                  code: 500, status: false
              },
          HttpStatus.INTERNAL_SERVER_ERROR);
      }
   
    }
    async getMerchantUserRole(business: Business): Promise<any> {
        try{
  
             let merchantroles = await this.merchantroleRepository.find({ where: { business:business,isDisabled:false } });
              if(merchantroles){
                  return this.apiResponseService.SuccessResponse(
                      `${merchantroles.length} merchant roles found`,
                      HttpStatus.OK, merchantroles);
              }
             
          }
        
        catch (error) {
          console.log('getMerchantUserRole Error Message', error, Date.now())
          Logger.error(error);
          return new
              HttpException({
                  message: 'Process error while executing operation:',
                  code: 500, status: false
              },
          HttpStatus.INTERNAL_SERVER_ERROR);
      }
   
    }
    async deleteMerchantUserRole(Id: string, actionby: string, businessId: string): Promise<any> {

        try {
            const merchantUserRole = await this.merchantroleRepository.findOne({ where: { id: Id.trim(), business: { id: businessId }, isDisabled: false } });
            if (!merchantUserRole) {
                return this.apiResponseService.FailedBadRequestResponse(
                    `No merchant User Role match found`,
                    HttpStatus.BAD_REQUEST, '');

            }
            ////TODO check if attched to products 
            const alreadyInused = await this.merchantRoleUserRepository.findOne({ where:{merchantrole:merchantUserRole}})
            if (alreadyInused) {

                return this.apiResponseService.FailedBadRequestResponse(
                    `delete failed ${alreadyInused.merchantrole.name} is found and  attched  to a user `,
                    HttpStatus.BAD_REQUEST, '');
            }

            merchantUserRole.isDisabled = true;
            merchantUserRole.updatedby = actionby
            const dbresponse = await this.merchantroleRepository.save(merchantUserRole);
            return this.apiResponseService.SuccessResponse(
                `${dbresponse.name} has been  disabled`,
                HttpStatus.OK, dbresponse);

        }
        catch (error) {
            console.log('deleteMerchantUserRole Error Message', error, Date.now())
            return new
                HttpException({
                    message: 'Process error while executing operation:',
                    code: 500, status: false
                },
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    ///Merchant User to Role
    async assignMerchantUserToRole(model: AddMarchantUserRoleDto, actionby: string, business: Business): Promise<any> {

        try {
            
            let validationResult = await this.payloadService.validateAssignMerchantUserRoleAsync(model);
            if(validationResult.IsValid){
            
                let getroleModel= await this.merchantroleRepository.findOne({where:{id:model.roleId}});
                if(!getroleModel){
                    return this.apiResponseService.FailedBadRequestResponse(
                        ` merchant role  information not found ${model.roleId}`,
                        HttpStatus.BAD_REQUEST, '');
                }
                let getuserModel= await this.userRepository.findOne({where:{id:model.userid}});
                if(!getuserModel){
                    return this.apiResponseService.FailedBadRequestResponse(
                        ` merchant user  information not found ${model.userid}`,
                        HttpStatus.BAD_REQUEST, '');
                }
                let checkforRoleDuplicate=await this.merchantRoleUserRepository.findOne({where:{merchantrole:{id:model.roleId},merchantuser:{id:model.userid},isDisabled:false}})
                if(checkforRoleDuplicate){

                    return this.apiResponseService.FailedBadRequestResponse(
                        ` merchant user already belong to role ${getroleModel.name}`,
                        HttpStatus.BAD_REQUEST, '');
                }
                
                let assignRoleToUserModel=new MerchantRoleUser();
                assignRoleToUserModel.merchantuser=getuserModel;
                assignRoleToUserModel.merchantrole=getroleModel;
                assignRoleToUserModel.createdby=actionby;
                assignRoleToUserModel.business=business;
                let response=await this.merchantRoleUserRepository.save(assignRoleToUserModel);
                if(response){

                    return this.apiResponseService.SuccessResponse(
                        `${getuserModel.firstName} has been added to role ${getroleModel.name}`,
                        HttpStatus.OK, response);
                }
                return new
                HttpException({
                    message: 'Process error while executing operation:',
                    code: 500, status: false
                },
                    HttpStatus.INTERNAL_SERVER_ERROR);

            }
            return await this.payloadService.badRequestErrorMessage(validationResult);

        }
        catch (error) {
            console.log('assignMerchantUserToRole Error Message', error, Date.now())
            return new
                HttpException({
                    message: 'Process error while executing operation:',
                    code: 500, status: false
                },
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    async updateassignMerchantUserToRole(model: UpdateMarchantUserRoleDto, actionby: string, business: Business): Promise<any> {

        try {
             let validationResult = await this.payloadService.validateUpdateAssignMerchantUserRoleAsync(model);
            if(validationResult.IsValid){
            
                let getroleModel= await this.merchantroleRepository.findOne({where:{id:model.roleId}});
                if(!getroleModel){
                    return this.apiResponseService.FailedBadRequestResponse(
                        ` merchant role  information not found ${model.roleId}`,
                        HttpStatus.BAD_REQUEST, '');
                }
                let getuserModel= await this.userRepository.findOne({where:{id:model.userid}});
                if(!getuserModel){
                    return this.apiResponseService.FailedBadRequestResponse(
                        ` merchant user  information not found ${model.userid}`,
                        HttpStatus.BAD_REQUEST, '');
                }
                let checkforRoleDuplicate=await this.merchantRoleUserRepository.findOne({where:{merchantrole:{id:model.roleId},merchantuser:{id:model.userid},isDisabled:false}})
                if(checkforRoleDuplicate){

                    return this.apiResponseService.FailedBadRequestResponse(
                        ` merchant user already belong to role ${getroleModel.name}`,
                        HttpStatus.BAD_REQUEST, '');
                }
                
               
                checkforRoleDuplicate.merchantrole=getroleModel;
                checkforRoleDuplicate.updatedby=actionby;
               
                let response=await this.merchantRoleUserRepository.save(checkforRoleDuplicate);
                if(response){
                    
                    return this.apiResponseService.SuccessResponse(
                        `${getuserModel.firstName} has been updated to role ${getroleModel.name}`,
                        HttpStatus.OK, response);
                }
                return new
                HttpException({
                    message: 'Process error while executing operation:',
                    code: 500, status: false
                },
                    HttpStatus.INTERNAL_SERVER_ERROR);

            }
            return await this.payloadService.badRequestErrorMessage(validationResult);

        }
        catch (error) {
            console.log('updateassignMerchantUserToRole Error Message', error, Date.now())
            return new
                HttpException({
                    message: 'Process error while executing operation:',
                    code: 500, status: false
                },
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    async deleteMerchantUserToRole(Id: string, actionby: string, businessId: string): Promise<any> {

        try{
            let getUserInRole=await this.merchantRoleUserRepository.findOne({where:{id:Id,isDisabled:false,business:{id:businessId}}})
            if(!getUserInRole){

                return this.apiResponseService.FailedBadRequestResponse(
                    `  No merchant information found `,
                    HttpStatus.BAD_REQUEST, '');
            }
            getUserInRole.isDisabled=true;
            getUserInRole.updatedby=actionby
            let response =await this.merchantRoleUserRepository.save(getUserInRole);
            return this.apiResponseService.SuccessResponse(
                `${getUserInRole.merchantuser.firstName} has been disabled on role ${getUserInRole.merchantrole.name}`,
                HttpStatus.OK, response);

        }
        catch (error) {
            console.log('deleteMerchantUserToRole Error Message', error, Date.now())
            return new
                HttpException({
                    message: 'Process error while executing operation:',
                    code: 500, status: false
                },
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getMerchantUserInRole(business: Business): Promise<any> {
        try{
  
             let merchantroles = await this.merchantRoleUserRepository.find({ where: {business:business,isDisabled:false } });
              if(merchantroles){
                  return this.apiResponseService.SuccessResponse(
                      `${merchantroles.length} merchant user roles  information found`,
                      HttpStatus.OK, merchantroles);
              }
             
          }
        
        catch (error) {
          console.log('getMerchantUserInRole Error Message', error, Date.now())
          Logger.error(error);
          return new
              HttpException({
                  message: 'Process error while executing operation:',
                  code: 500, status: false
              },
          HttpStatus.INTERNAL_SERVER_ERROR);
      }
   
    }


    ///SetUp Merchant Application Permission

    async addMerchantApplicationModule(model:MarchantModuleDto, actionBy:string,businessId:string):Promise<any>{
        try{

            let validationResult = await this.payloadService.validateMerchantApplicationModuleAsync(model);
            if(validationResult.IsValid){
                
                let duplicatecheck=await this.merchantModuleRepository.findOne({where:{name:model.name.trim(),isDisabled:false,business:{id
                    :businessId}}})
                    if(duplicatecheck){
        
                        return this.apiResponseService.FailedBadRequestResponse(
                            `duplicate merchant application module  name found ${model.name}`,
                            HttpStatus.BAD_REQUEST, '');
                    }
                    let getbusiness=await this.businessRepository.findOne({where:{id:businessId}});
                    
                    let merchantModule=new MerchantModule();
                    merchantModule.name=model.name;
                    merchantModule.business=getbusiness;
                    merchantModule.createdby=actionBy;
        
                    let dbresponse=await this.merchantModuleRepository.save(merchantModule);
                    if(dbresponse){
                        return this.apiResponseService.SuccessResponse(
                            `${dbresponse.name} merchant ammplication module has been created and activated`,
                            HttpStatus.OK, dbresponse);
                    }
                    return new
                        HttpException({
                            message: 'addMerchantApplicationModule Process error while executing operation:',
                            code: 500, status: false
                        },
                    HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return await this.payloadService.badRequestErrorMessage(validationResult);
            
          
        }
        catch (error) {
            console.log('addMerchantApplicationModule Error Message', error, Date.now())
            Logger.error(error);
            return new
                HttpException({
                    message: 'Process error while executing operation:',
                    code: 500, status: false
                },
            HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}


