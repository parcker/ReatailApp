import { Controller, Post, Body, Res, HttpStatus, Req, HttpException, UsePipes, ValidationPipe, Param, Get } from '@nestjs/common';
import { SigupDto } from '../app-Dto/usermgr/signup.dto';
import { AccountService } from './account.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';


@Controller('api/account')

export class AccountController {

    constructor(  private readonly accountService: AccountService) {}

   
    @Post('/signup')
    public async Sigup(@Body() body: SigupDto,@Res() res){
  
        const response = await this.accountService.create(body);
        if(response.status===false){

            return res.status(response.code).json(response);
        }
        return res.status(HttpStatus.OK).json(response);
        
    }
    @Get('/activate/:token')
    async ActivateAcctount(@Param('token') token,@Res() res){
        
        //console.log(token);
        const response= await this.accountService.activateAccount(token);
        if(response.status===false){return res.status(response.code).json(response);}
        return res.status(HttpStatus.OK).json(response);
    }
}
