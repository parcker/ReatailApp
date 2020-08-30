import { Controller, Post, UseGuards, Body, Request, HttpStatus, Res, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreatePurchaseOrderDto, ApprovePurchaseOrderDto } from '../../../app-Dto/merchant/purcahseorder.dto';
import { PurchaseorderService } from './purchaseorder.service';
import { SearchParametersDto } from '../../../app-Dto/merchant/searchparameters.dto';

@Controller('/api/purchaseorder')
export class PurchaseorderController {

    constructor(private readonly purchaseorderservice: PurchaseorderService) { }

    @Post('/creatpurchaseOrder')
    @UseGuards(AuthGuard('jwt'))
     async creatpurchaseOrder(@Body() model: CreatePurchaseOrderDto, @Request() req, @Res() res) {

        const response = await this.purchaseorderservice.creatPurchaseHeader(model, req.user.business,req.user.email,req.user.businesslocationId);
        return res.status(response.code).json(response);


    }
    @Post('/approvepurchaseOrder')
    @UseGuards(AuthGuard('jwt'))
     async approvepurchaseOrder(@Body() model: ApprovePurchaseOrderDto, @Request() req, @Res() res) {

        const response = await this.purchaseorderservice.approvePurchaseOrder(model, req.user.email);
        return res.status(response.code).json(response);


    }
   
    @Post('/getpurchaseinfo')
    @UseGuards(AuthGuard('jwt'))
     async getpurchaseOrders(@Body() model: SearchParametersDto, @Request() req, @Res() res) {

        const response = await this.purchaseorderservice.getpurchaseorders(model,req.user.email);
        return res.status(response.code).json(response);

    }
    @Post(':purchaseId/creatpurchaseOrder')
    @UseGuards(AuthGuard('jwt'))
     async UpdatepurchaseOrder(@Param('purchaseId') purchaseId:number,@Body() model: CreatePurchaseOrderDto, @Request() req, @Res() res) {

        const response = await this.purchaseorderservice.updatePurchaseOrder(model,purchaseId ,req.user.email,req.user.business);
        return res.status(response.code).json(response);


    }

}
