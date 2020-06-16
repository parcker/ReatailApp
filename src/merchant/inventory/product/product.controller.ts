import { Controller, Post, UseGuards, UsePipes, ValidationPipe, Body, Request, Get, HttpException, HttpStatus, Patch, Param, Res } from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthGuard } from '@nestjs/passport';

import { CreatProductDto, ProductStatusDto, UpdateProductDto, ProductConfigurationDto } from '../../../app-Dto/product.dto';

@Controller('/api/product')
export class ProductController {

    constructor(private readonly productService: ProductService) { }

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
    @Get('/getpacking')
    //@UseGuards(AuthGuard('jwt'))
    async getpacking(@Request() req, @Res() res): Promise<any> {

        const response = await this.productService.getpacking();
        if (response.status === false) {
            return res.status(response.code).json(response);
        }
        return res.status(HttpStatus.OK).json(response);

    }
    @Get('/getproductwithfewdetail')
    @UseGuards(AuthGuard('jwt'))
    async getproductwithfewdetail(@Request() req, @Res() res): Promise<any> {

        const response = await this.productService.getProduct(req.user.businessId);
        if (response.status === false) {
            return res.status(response.code).json(response);
        }
        return res.status(HttpStatus.OK).json(response);

    }
    @Get('/getmyproducts')
    @UseGuards(AuthGuard('jwt'))
    async getmyproducts(@Request() req, @Res() res): Promise<any> {

        const response = await this.productService.getProductwithfulldetails(req.user.businessId);
        if (response.status === false) {
            return res.status(response.code).json(response);
        }
        return res.status(HttpStatus.OK).json(response);

    }
}
