import { Controller, Post, UseGuards, UsePipes, ValidationPipe, Body,Request, Get, HttpException, HttpStatus, Patch, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthGuard } from '@nestjs/passport';

import { CreatProductDto, ProductStatusDto, UpdateProductDto } from '../app-Dto/product.dto';

@Controller('/api/product')
export class ProductController {

    constructor(private readonly productService: ProductService ) {}

    @Post('/create')
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(new ValidationPipe())
    async create(@Request() req,@Body() body:CreatProductDto){
       
        
        const response = await this.productService.createProduct(body,req.user.id,req.user.businessId);
        if(response.status===false){throw new HttpException(response, HttpStatus.BAD_REQUEST);}
        return response;

      
    }
    @Post('/setproductstatus')
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(new ValidationPipe())
    async setproductstatus(@Request() req,@Body() body:ProductStatusDto){
       
   
        const response = await this.productService.disableproduct(req.user.id,body.status,body.productId);
        if(response.status===false){throw new HttpException(response, HttpStatus.BAD_REQUEST);}
        return response;

      
    }
    //
    @Patch(':id/updateproduct')
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(new ValidationPipe())
    async updatesubcategory(@Param('id') id,@Request() req,@Body() body: UpdateProductDto){
        
        const response = await this.productService.updateProduct(req.user.id,id,body,req.user.businessId);
        if(response.status===false){throw new HttpException(response, HttpStatus.BAD_REQUEST);}
        return response;
    }
    @Get('/getpacking')
    @UseGuards(AuthGuard('jwt'))
    async getpacking():Promise<any> {
        
        let packingtype=[{id:1,vaule:'Cartons'},{id:2,vaule:'Single'}]
        return packingtype;
       
    }
    @Get('/getproductwithfewdetail')
    @UseGuards(AuthGuard('jwt'))
    async getproductwithfewdetail(@Request() req,):Promise<any> {
        
        const response = await this.productService.getProduct(req.user.businessId);
        if(response.status===false){throw new HttpException(response, HttpStatus.BAD_REQUEST);}
        return response;
       
    }
    @Get('/getmyproducts')
    @UseGuards(AuthGuard('jwt'))
    async getmyproducts(@Request() req,):Promise<any> {
        
        const response = await this.productService.getProductwithfulldetails(req.user.businessId);
        if(response.status===false){throw new HttpException(response, HttpStatus.BAD_REQUEST);}
        return response;
       
    }
}
