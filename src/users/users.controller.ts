import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { ICreateUser } from './user.interface';

@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UsersService
    ) {}

    @Post()
    public async createUser(@Body() body: ICreateUser) {

       // return await this.userService.create(body);
    }
}
