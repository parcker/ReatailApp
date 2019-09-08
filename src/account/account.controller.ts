import { Controller, Post, Body } from '@nestjs/common';
import { SigupDto } from '../app-Dto/usermgr/signup.dto';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {

    constructor(  private readonly accountService: AccountService) {}

    @Post('/signup')
    public async Sigup(@Body() body: SigupDto){
        console.log("Sigup", body)
        const response = await this.accountService.create(body);
        console.log(response);
        
    }
}
