import { Controller, Post, UseGuards, UsePipes, ValidationPipe, Body, Request, Get, HttpException, HttpStatus, Patch, Param, Res, Delete, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreatProductDto } from '../../../app-Dto/product.dto';
import { CreatePurchaseOrderHeaderDto, CreatePurchaseOrderItemDto } from '../../../app-Dto/purcahseorder.dto';
import { PurchaseorderService } from './purchaseorder.service';

@Controller('/api/purchaseorder')
export class PurchaseorderController {

    constructor(private readonly purchaseorderservice: PurchaseorderService) { }

    @Post('/creatpurchaseheader')
    @UseGuards(AuthGuard('jwt'))
     async creatpurchaseheader(@Body() model: CreatePurchaseOrderHeaderDto, @Request() req, @Res() res) {

        const response = await this.purchaseorderservice.creatPurchaseHeader(model, req.user.business,req.user.id,req.user.businesslocationId);
        if (response.status === false) {
            return res.status(response.code).json(response);
        }
        
        return res.status(HttpStatus.OK).json(response);


    }
    @Post('/creatpurchaseitems')
    @UseGuards(AuthGuard('jwt'))
     async creatpurchaseitems(@Body() model: CreatePurchaseOrderItemDto, @Request() req, @Res() res) {

        const response = await this.purchaseorderservice.postpurchaseitem(model ,req.user.id);
        if (response.status === false) {
            return res.status(response.code).json(response);
        }
        
        return res.status(HttpStatus.OK).json(response);

    }

}
