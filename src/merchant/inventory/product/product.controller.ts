import { Controller, Post, UseGuards, UsePipes, ValidationPipe, Body, Request, Get, HttpException, HttpStatus, Patch, Param, Res, Delete, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthGuard } from '@nestjs/passport';

import { CreatProductDto, ProductStatusDto, UpdateProductDto, ProductConfigurationDto } from '../../../app-Dto/merchant/product.dto';
import { SeedProductDto } from '../../../app-Dto/merchant/seedstock.dto';
import {ApiUseTags } from '@nestjs/swagger';
import { UserTypes } from '../../../auth/auth.guard';
import { UserType } from '../../../enums/settings.enum';
import {
    paginate,
    Pagination,
    IPaginationOptions,
  } from 'nestjs-typeorm-paginate';
import { Product } from '../../../entities/product.entity';
import { ApiResponseService } from '../../../shared/response/apiResponse.service';

@ApiUseTags('product')
@Controller('/api/product')
export class ProductController {

    constructor(private readonly productService: ProductService,private readonly apiResponseService: ApiResponseService) { }

    @Post('/create')
    @UseGuards(AuthGuard('jwt'))

    async create(@Body() creatProductDto: CreatProductDto, @Request() req, @Res() res) {

      
        const response = await this.productService.createProduct(creatProductDto, req.user.id, req.user.business);
        if (response.status === false) {
            return res.status(response.code).json(response);
        }
        
        return res.status(HttpStatus.OK).json(response);

    }
    @Post('/setproductstatus')
    @UseGuards(AuthGuard('jwt'))

    async setproductstatus(@Request() req, @Res() res, @Body() body: ProductStatusDto) {


        const response = await this.productService.disableproduct(req.user.id, body.status, body.productId);
        if (response.status === false) {
            return res.status(response.code).json(response);
        }
        return res.status(HttpStatus.OK).json(response);


    }
    //
    @Patch(':id/updateproduct')
    @UseGuards(AuthGuard('jwt'))

    async updateproduct(@Param('id') id,@Request() req, @Res() res, @Body() body: UpdateProductDto) {

        const response = await this.productService.updateProduct(req.user.id, id, body, req.user.business);
        if (response.status === false) {
            return res.status(response.code).json(response);
        }
        return res.status(HttpStatus.OK).json(response);

    }
    @Patch(':productconfigid/:status/updateproductconfig')
    @UseGuards(AuthGuard('jwt'))

    async updateproductconfig(@Param('productconfigid') productconfigid:string,@Param('status') status:boolean,@Request() req, @Res() res, @Body() body: ProductConfigurationDto) {

        const response = await this.productService.updateProductConfiguration(body,productconfigid,req.user.id,status);
        if (response.status === false) {
            return res.status(response.code).json(response);
        }
        return res.status(HttpStatus.OK).json(response);

    }
   

    @Delete(':productId/deleteproduct')
    @UseGuards(AuthGuard('jwt'))
    async deleteproduct(@Param('productId') productId:string,@Request() req, @Res() res): Promise<any> {

        const response = await this.productService.deleteproduct(productId,req.user.business);
        if (response.status === false) {
            return res.status(response.code).json(response);
        }
        return res.status(HttpStatus.OK).json(response);

    }
    @Get('/getproductwithfewdetail')
    @UseGuards(AuthGuard('jwt'))
    async getproductwithfewdetail(@Query('page') page: number,@Request() req, @Res() res): Promise<any> {

        const response = await this.productService.getProduct(page,req.user.businessId);
        if (response.status === false) {
            return res.status(response.code).json(response);
        }
        return res.status(HttpStatus.OK).json(response);

    }
    @Get('/getmyproducts')
    @UserTypes(UserType.merchantuser)
    @UseGuards(AuthGuard('jwt'))
    async getmyproducts(@Query('page') page: number,@Request() req, @Res() res): Promise<any> {

        const response = await this.productService.getProductwithfulldetails(page,req.user.businessId);
        return res.status(response.code).json(response);

    }

    @Post('/seedProductTostock')
    @UseGuards(AuthGuard('jwt'))

    async seedProductTostock(@Request() req, @Res() res, @Body() body: SeedProductDto) {

        const response = await this.productService.SeedProducttoStock(body.productId,body.warehouseId,body.quantity,req.user.businesslocation,req.user.business);
        if (response.status === false) {
            return res.status(response.code).json(response);
        }
        return res.status(HttpStatus.OK).json(response);


    }
    @Get('/getProductForSale')
    @UseGuards(AuthGuard('jwt'))
    async getProductForSale(@Query('page')page: number, @Request() req, @Res() res): Promise<any> {

        const response = await this.productService.getProductForSale(page,req.user.businesslocationId,req.user.business);
        if (response.status === false) {
            return res.status(response.code).json(response);
        }
        return res.status(HttpStatus.OK).json(response);

    }
    @Get('/getProductForPurchase')
    @UseGuards(AuthGuard('jwt'))
    async getProductForPurchase(@Request() req, @Res() res): Promise<any> {

        const response = await this.productService.getProductForPurchase(req.user.business);
        if (response.status === false) {
            return res.status(response.code).json(response);
        }
        return res.status(HttpStatus.OK).json(response);

    }
}
