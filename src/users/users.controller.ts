import { Controller, Post, Body, ValidationPipe,Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { ICreateUser } from './user.interface';
import { CreateNonAdminUser } from '../app-Dto/usermgr/signup.dto';

@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UsersService
    ) {}

    @Post()
    public async createUser(@Request() req,@Body() body: CreateNonAdminUser) {

       return await this.userService.createStaff(req.user.id,body);
    }
}
