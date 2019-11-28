import { Controller, Post, UseGuards, UsePipes, ValidationPipe, Body,Request, Get, HttpException, HttpStatus } from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthGuard } from '@nestjs/passport';

import { CreatProductDto } from '../app-Dto/product.dto';

@Controller('/api/product')
export class ProductController {

    constructor(private readonly productService: ProductService ) {}

    @Post('/create')
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(new ValidationPipe())
    async create(@Request() req,@Body() body:CreatProductDto){
       
        console.log('create product');
        const response = await this.productService.createProduct(body,req.user.id,req.user.businessId);
        if(response.status===false){throw new HttpException(response, HttpStatus.BAD_REQUEST);}
        return response;

      
    }
    @Get('/find')
    @UseGuards(AuthGuard('jwt'))
    async getpacking():Promise<any> {
        
        let packingtype=[{id:1,vaule:'Cartons'},{id:2,vaule:'Single'}]
        return packingtype;
       
    }
}
