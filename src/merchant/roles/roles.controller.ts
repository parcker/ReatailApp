import { Controller, Post,Body, Get, Request, UseGuards, UsePipes, ValidationPipe, HttpException, HttpStatus, Res } from '@nestjs/common';
import { CreateRoleDto, RoleDto, AssignRoleDto } from '../../app-Dto/usermgr/role/role.dto';
import { RolesService } from './roles.service';
import { ResponseObj } from '../../shared/generic.response';
import { AuthGuard } from '@nestjs/passport';

@Controller('/api/roles')
export class RolesController {

    constructor(private readonly roleService: RolesService ) {}

    @Post('/create')
    @UseGuards(AuthGuard('jwt'))
    
    async create(@Request() req, @Res() res,@Body() body:CreateRoleDto){
       
        let response= await this.roleService.createRole(body,req.user.id,req.user.businessId);
        if(response.status===false){
            return res.status(response.code).json(response);
        }
        return res.status(HttpStatus.OK).json(response);
    }
    @Get('/find')
    @UseGuards(AuthGuard('jwt'))
    async getRoles():Promise<ResponseObj<RoleDto[]>> {
        
        return await this.roleService.findAll();
       
    }
    @Post('/assignrole')
    @UseGuards(AuthGuard('jwt'))
    
    async assignRole(@Request() req, @Body() body: AssignRoleDto){
        
        const response = await this.roleService.assignUserToRole(body.roleId,body.userIds,req.user.id);
        if(response.status==false){throw new HttpException(response, HttpStatus.BAD_REQUEST);}
        return response;
    }

}
