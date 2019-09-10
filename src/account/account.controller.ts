import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { SigupDto } from '../app-Dto/usermgr/signup.dto';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {

    constructor(  private readonly accountService: AccountService) {}

    @Post('/signup')
    public async Sigup(@Body() body: SigupDto){
  
        const response = await this.accountService.create(body);
        return { code: 200, message: 'Process completed',data:response };
      
        
    }
}
