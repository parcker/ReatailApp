import { Controller, Post, UseGuards, UsePipes, ValidationPipe, Body, HttpException, HttpStatus,Request, Get, Res, Patch, Param } from '@nestjs/common';
import { PartnersService } from './partners.service';
import { AuthGuard } from '@nestjs/passport';
import { CreatCustomerDto, CreatSupplierDto, UpdateCustomerDto } from '../../app-Dto/partner.dto';

@Controller('/api/partners')
export class PartnersController {

  constructor(readonly partnersService: PartnersService){}

    @Post('/customer/creat')
    @UseGuards(AuthGuard('jwt'))
    async creatcustomer(@Request() req,@Res() res,@Body() body: CreatCustomerDto){
        
        
        const response = await this.partnersService.createcustomer(body,req.user.id,req.user.business);
        if(response.status===false){
            return res.status(response.code).json(response);
        }
        return res.status(HttpStatus.OK).json(response);
    }
    @Patch(':id/customer/update')
    @UseGuards(AuthGuard('jwt'))
    
    async updatecustomer(@Param('id') id,@Request() req,@Res() res,@Body() body: UpdateCustomerDto){
        
        const response = await this.partnersService.updatecustomer(body,id,req.user.id,req.user.business);
        if(response.status===false){
            return res.status(response.code).json(response);
        }
        return res.status(HttpStatus.OK).json(response);
    }
    @Patch(':id/supplier/update')
    @UseGuards(AuthGuard('jwt'))
    
    async updatesupplier(@Param('id') id,@Request() req,@Res() res,@Body() body: CreatSupplierDto){
        
        const response = await this.partnersService.updatesupplier(body,id,req.user.id,req.user.business);
        if(response.status===false){
            return res.status(response.code).json(response);
        }
        return res.status(HttpStatus.OK).json(response);
    }
    @Post('/supplier/creat')
    @UseGuards(AuthGuard('jwt'))
    
    async creatsuplier(@Request() req,@Res() res,@Body() body: CreatSupplierDto){
        
        
        const response = await this.partnersService.createsupplier(body,req.user.id,req.user.business);
        if(response.status===false){
            return res.status(response.code).json(response);
        }
        return res.status(HttpStatus.OK).json(response);
    }
    @Get('/customer/mycustomer')
    @UseGuards(AuthGuard('jwt'))
    
    async getcustomer(@Request() req, @Res() res){
        
        const response = await this.partnersService.getcustomers(req.user.business);
        if(response.status===false){
            return res.status(response.code).json(response);
        }
        return res.status(HttpStatus.OK).json(response);
    }
    @Get('/supplier/mysupplier')
    @UseGuards(AuthGuard('jwt'))
    
    async getsupplier(@Request() req,@Res() res){
        
        const response = await this.partnersService.getsuppliers(req.user.business);
        if(response.status===false){
            return res.status(response.code).json(response);
        }
        return res.status(HttpStatus.OK).json(response);
    }


}
