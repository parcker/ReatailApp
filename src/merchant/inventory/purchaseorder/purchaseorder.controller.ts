import { Controller, Post, UseGuards, UsePipes, ValidationPipe, Body, Request, Get, HttpException, HttpStatus, Patch, Param, Res, Delete, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreatProductDto } from '../../../app-Dto/product.dto';
import { CreatePurchaseOrderHeaderDto } from '../../../app-Dto/purcahseorder.dto';
import { PurchaseorderService } from './purchaseorder.service';

@Controller('purchaseorder')
export class PurchaseorderController {

    constructor(private readonly purchaseorderservice: PurchaseorderService) { }
    @Post('/creatPurchaseHeader')
    @UseGuards(AuthGuard('jwt'))
     async creatPurchaseHeader(@Body() model: CreatePurchaseOrderHeaderDto, @Request() req, @Res() res) {

        const response = await this.purchaseorderservice.creatPurchaseHeader(model, req.user.business,req.user,req.user.businesslocationId);
        if (response.status === false) {
            return res.status(response.code).json(response);
        }
        
        return res.status(HttpStatus.OK).json(response);

    }

}
