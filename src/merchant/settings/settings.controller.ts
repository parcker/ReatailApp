import { Controller, Post, UseGuards, Body, Res, HttpStatus,Request, Patch, Param, Get, Query, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreatProductDto, UpdateProductDto } from '../../app-Dto/merchant/product.dto';
import {SettingsService} from '../settings/settings.service';
import { TaxDto } from '../../app-Dto/merchant/tax.dto';
import { CreatePaymentTermDto } from '../../app-Dto/merchant/paymentterm.dto';
import {ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('settings')
@Controller('api/settings')
export class SettingsController {


    constructor(private readonly SettingsService: SettingsService) { }

    @Post('/createtax')
    @UseGuards(AuthGuard('jwt'))
    async create(@Body() taxmodel: TaxDto, @Request() req, @Res() res) {

        const response = await this.SettingsService.CreatTaxforBusiness(taxmodel, req.user.business,req.user.email);
        if (response.status === false) {
            return res.status(response.code).json(response);
        }
        
        return res.status(HttpStatus.OK).json(response);

    }
    @Post('/createPaymentTerm')
    @UseGuards(AuthGuard('jwt'))
    async createPaymentTerm(@Body() model: CreatePaymentTermDto, @Request() req, @Res() res) {

        const response = await this.SettingsService.CreatPaymentTerm(model, req.user.business,req.user.email);
        if (response.status === false) {
            return res.status(response.code).json(response);
        }
        
        return res.status(HttpStatus.OK).json(response);

    }
    @Patch('/updatetax/:id')
    @UseGuards(AuthGuard('jwt'))
    async update(@Param('id') id,@Request() req, @Res() res, @Body() body: TaxDto) {

        const response = await this.SettingsService.UpdateTaxforBusiness(body,id,req.user.business,req.user.email);
        if (response.status === false) {
            return res.status(response.code).json(response);
        }
        return res.status(HttpStatus.OK).json(response);

    }
    @Delete('/deletetax/:id')
    @UseGuards(AuthGuard('jwt'))
    async deletetax(@Param('id') id,@Request() req, @Res() res) {

        const response = await this.SettingsService.DeleteTaxforBusiness(id,req.user.business);
        if (response.status === false) {
            return res.status(response.code).json(response);
        }
        return res.status(HttpStatus.OK).json(response);

    }

    @Get('/gettax')
    @UseGuards(AuthGuard('jwt'))
    async gettaxes(@Request() req, @Res() res): Promise<any> {

        const response = await this.SettingsService.GettaxbyBusiness(req.user.business);
        if (response.status === false) {
            return res.status(response.code).json(response);
        }
        return res.status(HttpStatus.OK).json(response);

    }
    @Get('/getpaymentterms')
    @UseGuards(AuthGuard('jwt'))
    async getpaymentterms(@Request() req, @Res() res): Promise<any> {

        const response = await this.SettingsService.GetCurrentPaymentTerms();
        if (response.status === false) {
            return res.status(response.code).json(response);
        }
        return res.status(HttpStatus.OK).json(response);

    }
}
