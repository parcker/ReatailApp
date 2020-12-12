import { Controller, Post, UseGuards, UsePipes, ValidationPipe, Body, HttpException, HttpStatus,Request, Get, Res, Patch, Param, Query, Delete } from '@nestjs/common';
import { PartnersService } from './partners.service';
import { AuthGuard } from '@nestjs/passport';
import { CreatCustomerDto, CreatSupplierDto, UpdateCustomerDto } from '../../app-Dto/merchant/partner.dto';
import {ApiUseTags } from '@nestjs/swagger';


@ApiUseTags('supplier')
@Controller('/api/supplier')
export class SupplierController {

  constructor(readonly partnersService: PartnersService){}

   
    @Patch(':id/update')
    @UseGuards(AuthGuard('jwt'))
    
    async updatesupplier(@Param('id') id,@Request() req,@Res() res,@Body() body: CreatSupplierDto){
        
        const response = await this.partnersService.updatesupplier(body,id,req.user.id,req.user.business);
        if(response.status===false){
            return res.status(response.code).json(response);
        }
        return res.status(HttpStatus.OK).json(response);
    }
    @Delete(':id/delete')
    @UseGuards(AuthGuard('jwt'))
    
    async deletesupplier(@Param('id') id,@Request() req,@Res() res){
        
        const response = await this.partnersService.deleteSupplier(id,req.user.business);
        if(response.status===false){
            return res.status(response.code).json(response);
        }
        return res.status(HttpStatus.OK).json(response);
    }
    @Post('/creat')
    @UseGuards(AuthGuard('jwt'))
    
    async creatsuplier(@Request() req,@Res() res,@Body() body: CreatSupplierDto){
        
        
        const response = await this.partnersService.createsupplier(body,req.user.id,req.user.business,req.user.businesslocationId);
        if(response.status===false){
            return res.status(response.code).json(response);
        }
        return res.status(HttpStatus.OK).json(response);
    }
   
    @Get('/mysupplier')
    @UseGuards(AuthGuard('jwt'))
    
    async getsupplier(@Query('page') page: number,@Request() req,@Res() res){
        
        const response = await this.partnersService.getsuppliers(page,req.user.business);
        if(response.status===false){
            return res.status(response.code).json(response);
        }
        return res.status(HttpStatus.OK).json(response);
    }


}
