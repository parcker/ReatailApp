import { Controller, Post, UseGuards, UsePipes, ValidationPipe, Body, HttpException, HttpStatus,Request, Get, Res, Patch, Param, Query } from '@nestjs/common';
import { PartnersService } from './partners.service';
import { AuthGuard } from '@nestjs/passport';
import { CreatCustomerDto, CreatSupplierDto, UpdateCustomerDto } from '../../app-Dto/partner.dto';

@Controller('/api/customer')
export class CustomerController {

  constructor(readonly partnersService: PartnersService){}

    @Post('/creat')
    @UseGuards(AuthGuard('jwt'))
    async creatcustomer(@Request() req,@Res() res,@Body() body: CreatCustomerDto){
        
        
        const response = await this.partnersService.createcustomer(body,req.user.id,req.user.business);
        if(response.status===false){
            return res.status(response.code).json(response);
        }
        return res.status(HttpStatus.OK).json(response);
    }
    @Patch(':id/update')
    @UseGuards(AuthGuard('jwt'))
    
    async updatecustomer(@Param('id') id,@Request() req,@Res() res,@Body() body: UpdateCustomerDto){
        
        const response = await this.partnersService.updatecustomer(body,id,req.user.id,req.user.business);
        if(response.status===false){
            return res.status(response.code).json(response);
        }
        return res.status(HttpStatus.OK).json(response);
    }
  
    @Get('/mycustomer')
    @UseGuards(AuthGuard('jwt'))
    
    async getcustomer(@Query('page') page: number,@Request() req, @Res() res){
        
        const response = await this.partnersService.getcustomers(page,req.user.business);
        if(response.status===false){
            return res.status(response.code).json(response);
        }
        return res.status(HttpStatus.OK).json(response);
    }
   


}
