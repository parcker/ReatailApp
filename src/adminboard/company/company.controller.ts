import { Controller, Patch, UseGuards, Param, Res, Body,Request, HttpStatus, Get, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UpdateProductDto } from '../../app-Dto/merchant/product.dto';
import { CompanyService } from './company.service';


@Controller('/api/company')
export class CompanyController {

    constructor(  private readonly buisnesService: CompanyService) {}

    @Patch('/changecompanystatus/:id/:status')
    @UseGuards(AuthGuard('jwt'))
    //@UseGuards(new RoleGuard())
    async changeStoreStatus(@Param('id') id:string,@Param('status') status:boolean, @Request() req, @Res() res) {

        const response = await this.buisnesService.businessStatus(id,status,req.user.email);
        return res.status(response.code).json(response);

    }
    @Get('/getallbusiness')
    @UseGuards(AuthGuard('jwt'))
    async getallbusiness(@Query('page') page: number,@Request() req, @Res() res) {

        const response = await this.buisnesService.getAllBusiness(page);
        return res.status(response.code).json(response);

    }
}
