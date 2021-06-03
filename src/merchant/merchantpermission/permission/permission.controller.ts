import { Body, Controller, Post, UseGuards ,Request, HttpStatus, Res, Patch, Get, Delete, Param} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags } from '@nestjs/swagger';
import { MerchantRolePermissionDto, UpdateMerchantRolePermissionDto } from '../../../app-Dto/merchant/merchantpermission.dto';
import { MarchantRoleDto, UpdateMarchantRoleDto } from '../../../app-Dto/merchant/merchantrole.dto';
import { AddMarchantUserRoleDto } from '../../../app-Dto/merchant/merchantuserrole.dto';
import { MerchantUserPermissionService } from './permission.service';


@ApiUseTags('merchantpermission')
@Controller('/api/merchantpermission')
export class PermissionController {


    constructor(  private readonly merchantUserPermissionService: MerchantUserPermissionService) {}

    @Post('/creat-merchant-role')
    @UseGuards(AuthGuard('jwt'))

    async creatMerchantRole(@Body() body: MarchantRoleDto,@Request() req,@Res() res){
       
        const response = await this.merchantUserPermissionService.creatMerchantUserRole(body,req.user.business,req.user.email);
        if(response.status===false){
            return res.status(response.code).json(response);
        }
        return res.status(HttpStatus.OK).json(response);
    }

    @Patch('/update-merchant-role')
    @UseGuards(AuthGuard('jwt'))

    async updateMerchantRole(@Body() body: UpdateMarchantRoleDto,@Request() req,@Res() res){
       
        const response = await this.merchantUserPermissionService.updateMerchantUserRole(body,req.user.business,req.user.email);
        if(response.status===false){
            return res.status(response.code).json(response);
        }
        return res.status(HttpStatus.OK).json(response);
    }

    @Get('/getMerchantRole')
    @UseGuards(AuthGuard('jwt'))
    
    async getMerchantRole(@Request() req, @Res() res){
        
        const response = await this.merchantUserPermissionService.getMerchantUserRole(req.user.business);
        return res.status(response.code).json(response);
    }

    @Delete(':id/deleteMerchantRole')
    @UseGuards(AuthGuard('jwt'))
    
    async deletecategory(@Param('id') id,@Request() req,@Res() res){
        
        const response = await this.merchantUserPermissionService.deleteMerchantUserRole(id,req.user.email,req.user.businessId);
        return res.status(response.code).json(response);
    }

   ///Merchant User to Role
   @Post('/assign-merchant-userTorole')
   @UseGuards(AuthGuard('jwt'))

   async creatMerchantUserRole(@Body() body: AddMarchantUserRoleDto,@Request() req,@Res() res){
      
       const response = await this.merchantUserPermissionService.assignMerchantUserToRole(body,req.user.email,req.user.business);
       return res.status(response.code).json(response);
   }

   @Delete(':id/merchant-userTorole')
   @UseGuards(AuthGuard('jwt'))
   
   async deleteMerchantUserRole(@Param('id') id,@Request() req,@Res() res){
       
       const response = await this.merchantUserPermissionService.deleteMerchantUserToRole(id,req.user.email,req.user.businessId);
       return res.status(response.code).json(response);
   }

   @Get('/merchant-userTorole')
   @UseGuards(AuthGuard('jwt'))
   
   async getMerchantUserRole(@Request() req, @Res() res){
       
       const response = await this.merchantUserPermissionService.getMerchantUserInRole(req.user.business);
       return res.status(response.code).json(response);
   }

   //// Assign Role to permission
   @Post('/assign-merchant-roleTo-permission')
   @UseGuards(AuthGuard('jwt'))

   async creatMerchantUserRoleToPermission(@Body() body: MerchantRolePermissionDto,@Request() req,@Res() res){
      
       const response = await this.merchantUserPermissionService.assignMerchantPremissionToMerchantRole(body,req.user.email,req.user.business);
       return res.status(response.code).json(response);
   }

   @Get(':roleId/merchant-userTorole')
   @UseGuards(AuthGuard('jwt'))
   
   async getMerchantUserRoleToPermission(@Param('id')roleId,@Request() req, @Res() res){
       
       const response = await this.merchantUserPermissionService.getMerchantPremissionToMerchantRole(roleId,req.user.business);
       return res.status(response.code).json(response);
   }

   @Patch('/update-merchant-roleTo-permission')
   @UseGuards(AuthGuard('jwt'))

   async updateMerchantUserRoleToPermission(@Body() body: UpdateMerchantRolePermissionDto,@Request() req,@Res() res){
      
       const response = await this.merchantUserPermissionService.updateMerchantPremissionToMerchantRole(body,req.user.email,req.user.business);
       return res.status(response.code).json(response);
   }

      
}
