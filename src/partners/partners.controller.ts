import { Controller, Post, UseGuards, UsePipes, ValidationPipe, Body, HttpException, HttpStatus,Request, Get } from '@nestjs/common';
import { PartnersService } from './partners.service';
import { AuthGuard } from '@nestjs/passport';
import { CreatCustomerDto, CreatSupplierDto } from '../app-Dto/partner.dto';

@Controller('/api/partners')
export class PartnersController {

  constructor(readonly partnersService: PartnersService){}

   @Post('/customer/creat')
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(new ValidationPipe())
    async creatcategory(@Request() req,@Body() body: CreatCustomerDto){
        
        
        const response = await this.partnersService.createcustomer(body,req.user.id,req.user.businessId);
        if(response.status===false){throw new HttpException(response, HttpStatus.BAD_REQUEST);}
        return response;
    }
    @Post('/supplier/creat')
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(new ValidationPipe())
    async creatsuplier(@Request() req,@Body() body: CreatSupplierDto){
        
        
        const response = await this.partnersService.createsupplierr(body,req.user.id,req.user.businessId);
        if(response.status===false){throw new HttpException(response, HttpStatus.BAD_REQUEST);}
        return response;
    }
    @Get('/customer/mycustomer')
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(new ValidationPipe())
    async getcustomer(@Request() req){
        
        const response = await this.partnersService.getcustomers(req.user.businessId);
        if(response.status===false){throw new HttpException(response, HttpStatus.BAD_REQUEST);}
        return response;
    }
    @Get('/supplier/mysupplier')
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(new ValidationPipe())
    async getsupplier(@Request() req){
        
        const response = await this.partnersService.getsuppliers(req.user.businessId);
        if(response.status===false){throw new HttpException(response, HttpStatus.BAD_REQUEST);}
        return response;
    }


}
