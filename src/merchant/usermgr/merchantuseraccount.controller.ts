import { Controller, Post, Body, Res,Request, UseGuards } from '@nestjs/common';

import { MerchantuseraccountService } from './merchantuseraccount.service';
import { MerchantUserDto } from '../../app-Dto/usermgr/signup.dto';
import { SignUpMagicDto } from '../../app-Dto/usermgr/signupmagiclink.dto';
import { AuthGuard } from '@nestjs/passport';
import {ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('merchantuseraccount')
@Controller('/api/merchantuseraccount')
export class MerchantuseraccountController {

    constructor(  private readonly merchantuseraccountService: MerchantuseraccountService) {}

   
    @Post('/user')
    public async Sigup(@Body() body: MerchantUserDto,@Res() res){
  
        const response = await this.merchantuseraccountService.createMerchantuser(body);
        return res.status(response.code).json(response);
       
    }
    @Post('/signuplink')
    @UseGuards(AuthGuard('jwt'))
    public async SendMagiclink_Signup(@Body() body: SignUpMagicDto, @Request() req, @Res() res){
  
        const response = await this.merchantuseraccountService.sendsignuplink(body,req.user.email);
        return res.status(response.code).json(response);
       
    }
}
