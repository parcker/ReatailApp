import { Controller, Post, Body } from '@nestjs/common';
import { SigupDto } from '../app-Dto/usermgr/signup.dto';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {

    constructor(  private readonly accountService: AccountService) {}
    @Post()
    public async Sigup(@Body() body: SigupDto){

        return await this.accountService.create(body);
    }
}
