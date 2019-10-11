import { Controller, Post, Body, Res, HttpStatus, Req, HttpException, UsePipes, ValidationPipe, Param, Get } from '@nestjs/common';
import { SigupDto } from '../app-Dto/usermgr/signup.dto';
import { AccountService } from './account.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';


@Controller('api/account')

export class AccountController {

    constructor(  private readonly accountService: AccountService) {}

   
    @Post('/signup')
    @UsePipes(new ValidationPipe())
    public async Sigup(@Body() body: SigupDto){
  
        const response = await this.accountService.create(body);
        if(response.status==false){throw new HttpException(response.message, HttpStatus.BAD_REQUEST);}
        return response;
        
    }
    @Get('/activate/:token')
    async ActivateAcctount(@Param('token') token){
        
        //console.log(token);
        let response= await this.accountService.activateAccount(token);
        if(response.status==false){throw new HttpException(response.message, HttpStatus.BAD_REQUEST);}
        return response;
    }
}
