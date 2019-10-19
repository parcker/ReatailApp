import {Controller, Post, Body, Query, Res, HttpStatus} from '@nestjs/common';
import {LoginDto} from './auth.dto';
import {AuthService} from './auth.service';
import {ApiOperation} from '@nestjs/swagger';

@Controller('api/auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}
// changedroute
    @Post('/login')
    public async login(@Body() body: LoginDto,@Res()res) {
        let response= await this.authService.login(body.email, body.password);
        return res.status(HttpStatus.OK).json(response);
    }
}
