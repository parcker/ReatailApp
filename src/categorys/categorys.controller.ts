import { Controller, Post, UseGuards, UsePipes, ValidationPipe, Body,Request, HttpException, HttpStatus, Get, Put, Param, Delete } from '@nestjs/common';
import { CategorysService } from './categorys.service';
import { AuthGuard } from '@nestjs/passport';
import { CreatCategoryDto, CreatSubCategoryDto, UpdateCategoryDto, UpdateSubCategoryDto } from '../app-Dto/category.dto';

@Controller('/api/categorys')
export class CategorysController {
    constructor(  private readonly categoryService: CategorysService) {}


    @Post('/creat')
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(new ValidationPipe())
    async creatcategory(@Request() req,@Body() body: CreatCategoryDto){
        
        const response = await this.categoryService.createCategory(body.name,req.user.id,req.user.businessId);
        if(response.status===false){throw new HttpException(response, HttpStatus.BAD_REQUEST);}
        return response;
    }
    @Put(':id/updatecategory')
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(new ValidationPipe())
    async updatecategory(@Param('id') id,@Request() req,@Body() body: UpdateCategoryDto){
        
        const response = await this.categoryService.updateCategory(id,body.name,req.user.id,req.user.businessId);
        if(response.status===false){throw new HttpException(response, HttpStatus.BAD_REQUEST);}
        return response;
    }
    @Put(':id/updatesubcategory')
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(new ValidationPipe())
    async updatesubcategory(@Param('id') id,@Request() req,@Body() body: UpdateSubCategoryDto){
        
        const response = await this.categoryService.updateSubCategory(id,body.name,req.user.id,req.user.businessId,body.categoryId);
        if(response.status===false){throw new HttpException(response, HttpStatus.BAD_REQUEST);}
        return response;
    }
    @Get('/mycategory')
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(new ValidationPipe())
    async getcategory(@Request() req){
        
        const response = await this.categoryService.getcategory(req.user.businessId);
        if(response.status===false){throw new HttpException(response, HttpStatus.BAD_REQUEST);}
        return response;
    }
    @Delete(':id/deletecategory')
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(new ValidationPipe())
    async deletecategory(@Param('id') id,@Request() req){
        
        const response = await this.categoryService.deleteCategory(id,req.user.id,req.user.businessId);
        if(response.status===false){throw new HttpException(response, HttpStatus.BAD_REQUEST);}
        return response;
    }
    @Delete(':id/deletesubcategory')
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(new ValidationPipe())
    async deletesubcategory(@Param('id') id,@Request() req){
        
        const response = await this.categoryService.deleteSubCategory(id,req.user.id,req.user.businessId);
        if(response.status===false){throw new HttpException(response, HttpStatus.BAD_REQUEST);}
        return response;
    }
    @Post('/subcategory/create')
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(new ValidationPipe())
    async creatsubcategory(@Request() req,@Body() body: CreatSubCategoryDto){
        
        const response = await this.categoryService.createSubCategory(body.name,body.categoryId,req.user.id,req.user.businessId);
        if(response.status===false){throw new HttpException(response, HttpStatus.BAD_REQUEST);}
        return response;
    }

}
