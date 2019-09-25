import { Controller, Post, Body, Res, HttpStatus, Req, HttpException, UsePipes, ValidationPipe } from '@nestjs/common';
import { SigupDto } from '../app-Dto/usermgr/signup.dto';
import { AccountService } from './account.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';


@Controller('account')

export class AccountController {

    constructor(  private readonly accountService: AccountService) {}

    @ApiOperation({ title: 'Create signup' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
 
    @Post('/signup')
    @UsePipes(new ValidationPipe())
    public async Sigup(@Body() body: SigupDto){
  
        let response = await this.accountService.create(body);
        
        
        
    }
}
