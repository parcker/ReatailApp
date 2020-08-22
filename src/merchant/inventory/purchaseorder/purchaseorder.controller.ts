import { Controller, Post, UseGuards, UsePipes, ValidationPipe, Body, Request, Get, HttpException, HttpStatus, Patch, Param, Res, Delete, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreatProductDto } from '../../../app-Dto/merchant/product.dto';
import { CreatePurchaseOrderDto } from '../../../app-Dto/merchant/purcahseorder.dto';
import { PurchaseorderService } from './purchaseorder.service';
import { PaginationDto } from '../../../shared/pagenation/PaginationDto';
import { SearchParametersDto } from '../../../app-Dto/merchant/searchparameters.dto';

@Controller('/api/purchaseorder')
export class PurchaseorderController {

    constructor(private readonly purchaseorderservice: PurchaseorderService) { }

    @Post('/creatpurchaseOrder')
    @UseGuards(AuthGuard('jwt'))
     async creatpurchaseOrder(@Body() model: CreatePurchaseOrderDto, @Request() req, @Res() res) {

        const response = await this.purchaseorderservice.creatPurchaseHeader(model, req.user.business,req.user.email,req.user.businesslocationId);
        if (response.status === false) {
            return res.status(response.code).json(response);
        }
        
        return res.status(HttpStatus.OK).json(response);


    }
   
    @Post('/getpurchaseinfo')
    @UseGuards(AuthGuard('jwt'))
     async getpurchaseOrders(@Body() model: SearchParametersDto, @Request() req, @Res() res) {

        const response = await this.purchaseorderservice.getpurchaseorders(model,req.user.business,req.user.businesslocation);
        return res.status(response.code).json(response);

    }

}
