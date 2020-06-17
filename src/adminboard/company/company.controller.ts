import { Controller, Patch, UseGuards, Param, Res, Body,Request, HttpStatus, Get, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UpdateProductDto } from '../../app-Dto/product.dto';
import { CompanyService } from './company.service';

@Controller('company')
export class CompanyController {

    constructor(  private readonly buisnesService: CompanyService) {}

    @Patch('/changecompanystatus/:id/:status')
    @UseGuards(AuthGuard('jwt'))
    async changeStoreStatus(@Param('id') id:string,@Param('status') status:boolean, @Request() req, @Res() res) {

        const response = await this.buisnesService.businessStatus(id,status,req.user.id);
        if (response.status === false) {
            return res.status(response.code).json(response);
        }
        return res.status(HttpStatus.OK).json(response);

    }
    @Get('/getallbusiness')
    @UseGuards(AuthGuard('jwt'))
    async getallbusiness(@Query('page') page: number,@Request() req, @Res() res) {

        const response = await this.buisnesService.getAllBusiness(page);
        if (response.status === false) {
            return res.status(response.code).json(response);
        }
        return res.status(HttpStatus.OK).json(response);

    }
}
