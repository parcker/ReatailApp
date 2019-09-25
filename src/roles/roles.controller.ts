import { Controller, Post,Body, Get, Inject } from '@nestjs/common';
import { CreateRoleDto, RoleDto } from '../app-Dto/usermgr/role/role.dto';
import { RolesService } from './roles.service';
import { ResponseObj } from '../shared/generic.response';

@Controller('roles')
export class RolesController {

    constructor(private readonly roleService: RolesService ) {}

    @Post()
    async create(@Body() body:CreateRoleDto){
        return await this.roleService.createRole(body);
    }
    @Get()
    async getRoles():Promise<ResponseObj<RoleDto[]>> {
        
        return await this.roleService.findAll();
       
    }

}
