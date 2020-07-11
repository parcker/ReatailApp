import { Controller, Post, Body, Res, HttpStatus, Req, HttpException, UsePipes, ValidationPipe, Param, Get } from '@nestjs/common';
import { SigupDto } from '../app-Dto/usermgr/signup.dto';
import { AccountService } from './account.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from '../app-Dto/usermgr/user.dto';


@Controller('api/account')

export class AccountController {

    constructor(  private readonly accountService: AccountService) {}

   
    @Post('/signup')
    public async Sigup(@Body() body: SigupDto,@Res() res){
  
        const response = await this.accountService.businessSignUp(body);
        if(response.status===false){

            return res.status(response.code).json(response);
        }
        return res.status(HttpStatus.OK).json(response);
        
    }
    @Post('/SupperAdminSigup')
    public async SupperAdminSigup(@Body() body: CreateUserDto,@Res() res){
  
        const response = await this.accountService.creatSupperAdminUsers(body);
        return res.status(response.code).json(response);
        
    }
    @Get('/activate/:token')
    async ActivateAcctount(@Param('token') token,@Res() res){
        
        //console.log(token);
        const response= await this.accountService.activateAccount(token);
        if(response.status===false){return res.status(response.code).json(response);}
        return res.status(HttpStatus.OK).json(response);
    }
}
