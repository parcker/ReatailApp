import { Controller, Post,Body, Get, Request, UseGuards, UsePipes, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import { CreateRoleDto, RoleDto, AssignRoleDto } from '../app-Dto/usermgr/role/role.dto';
import { RolesService } from './roles.service';
import { ResponseObj } from '../shared/generic.response';
import { AuthGuard } from '@nestjs/passport';

@Controller('/api/roles')
export class RolesController {

    constructor(private readonly roleService: RolesService ) {}

    @Post('/create')
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(new ValidationPipe())
    async create(@Body() body:CreateRoleDto){
        return await this.roleService.createRole(body);
    }
    @Get('/find')
    @UseGuards(AuthGuard('jwt'))
    async getRoles():Promise<ResponseObj<RoleDto[]>> {
        
        return await this.roleService.findAll();
       
    }
    @Post('/assignrole')
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(new ValidationPipe())
    async assignRole(@Request() req, @Body() body: AssignRoleDto){
        
        const response = await this.roleService.assignUserToRole(body.roleId,body.userId,req.user.id);
        if(response.status==false){throw new HttpException(response.message, HttpStatus.BAD_REQUEST);}
        return response;
    }

}
