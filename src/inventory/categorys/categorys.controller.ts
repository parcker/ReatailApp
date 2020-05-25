import { Controller, Post, UseGuards, UsePipes, ValidationPipe, Body,Request, HttpException, HttpStatus, Get, Put, Param, Delete, Patch, Res } from '@nestjs/common';
import { CategorysService } from './categorys.service';
import { AuthGuard } from '@nestjs/passport';
import { CreatCategoryDto, CreatSubCategoryDto, UpdateCategoryDto, UpdateSubCategoryDto } from '../../app-Dto/category.dto';

@Controller('/api/categorys')
export class CategorysController {
    constructor(  private readonly categoryService: CategorysService) {}


    @Post('/creat')
    @UseGuards(AuthGuard('jwt'))

    async creatcategory(@Body() body: CreatCategoryDto,@Request() req,@Res() res){
       
        const response = await this.categoryService.createCategory(body.name,req.user.id,req.user.business);
        if(response.status===false){
            return res.status(response.code).json(response);
        }
        return res.status(HttpStatus.OK).json(response);
    }
    @Patch(':id/updatecategory')
    @UseGuards(AuthGuard('jwt'))
    
    async updatecategory(@Param('id') id,@Request() req,@Res() res,@Body() body: UpdateCategoryDto){
        
        console.log('Update Cate',id);
        const response = await this.categoryService.updateCategory(id,body.name,req.user.id,req.user.business);
        if(response.status===false){
            return res.status(response.code).json(response);
        }
        return res.status(HttpStatus.OK).json(response);
    }
    @Patch(':id/updatesubcategory')
    @UseGuards(AuthGuard('jwt'))
    
    async updatesubcategory(@Param('id') id,@Request() req,@Body() body: UpdateSubCategoryDto,@Res() res){
        
        const response = await this.categoryService.updateSubCategory(id,body.name,req.user.id,req.user.business,body.categoryId);
        if(response.status===false){
            return res.status(response.code).json(response);
        }
        return res.status(HttpStatus.OK).json(response);
    }
    @Get('/mycategory')
    @UseGuards(AuthGuard('jwt'))
    
    async getcategory(@Request() req, @Res() res){
        
        const response = await this.categoryService.getcategory(req.user.business);
        if(response.status===false){
            return res.status(response.code).json(response);
        }
        return res.status(HttpStatus.OK).json(response);
    }
    @Delete(':id/deletecategory')
    @UseGuards(AuthGuard('jwt'))
    
    async deletecategory(@Param('id') id,@Request() req,@Res() res){
        
        const response = await this.categoryService.deleteCategory(id,req.user.id,req.user.businessId);
        if(response.status===false){
            return res.status(response.code).json(response);
        }
        return res.status(HttpStatus.OK).json(response);
    }
    @Delete(':id/deletesubcategory')
    @UseGuards(AuthGuard('jwt'))
    
    async deletesubcategory(@Param('id') id,@Request() req, @Res() res){
        
        const response = await this.categoryService.deleteSubCategory(id,req.user.id,req.user.businessId);
        if(response.status===false){
            return res.status(response.code).json(response);
        }
        return res.status(HttpStatus.OK).json(response);
    }
    @Post('/subcategory/create')
    @UseGuards(AuthGuard('jwt'))
    
    async creatsubcategory(@Request() req,@Res() res ,@Body() body: CreatSubCategoryDto){
        
        const response = await this.categoryService.createSubCategory(body.name,body.categoryId,req.user.id,req.user.business);
        if(response.status===false){
            return res.status(response.code).json(response);
        }
        return res.status(HttpStatus.OK).json(response);
    }

}
