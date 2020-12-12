import { Controller, Post, UseGuards, Res, Body,Request, HttpStatus, Get, Param, Delete, Patch } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { AuthGuard } from '@nestjs/passport';
import { CreatWarehouseDto, UpdateWarehouseDto } from '../../app-Dto/merchant/warehouse.dto';
import {ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('warehouse')
@Controller('/api/warehouse')
export class WarehouseController {

    constructor(private readonly warehouseService: WarehouseService ) {}

    @Post('/create')
    @UseGuards(AuthGuard('jwt'))
     async create(@Request() req, @Res() res,@Body() body:CreatWarehouseDto){
       
        let response= await this.warehouseService.create(body,req.user.email);
        if(response.status===false){
            return res.status(response.code).json(response);
        }
        return res.status(HttpStatus.OK).json(response);
    }
    
    @Get('/getwarehousebybusinesslocation/:status')
    @UseGuards(AuthGuard('jwt'))
    async getwarehousebybusinesslocation(@Param('status') status:boolean,@Request() req, @Res() res) {

        const response = await this.warehouseService.getWarehouseByBusinesslocation(req.user.businesslocation,req.user.business,status);
        if (response.status === false) {
            return res.status(response.code).json(response);
        }
        return res.status(HttpStatus.OK).json(response);

    }
    @Get('/getwarehousebybusinesslocationId/:businesslocationId')
    @UseGuards(AuthGuard('jwt'))
    async getwarehousebybusinesslocationId(@Param('businesslocationId') businesslocationId:string,@Res() res) {

        const response = await this.warehouseService.getWarehouseByBusinesslocationId(businesslocationId);
        if (response.status === false) {
            return res.status(response.code).json(response);
        }
        return res.status(HttpStatus.OK).json(response);

    }

    @Delete('/deletewarehouse/:warehouseId')
    @UseGuards(AuthGuard('jwt'))
    async deletewarehouse(@Param('warehouseId') warehouseId:string,@Res() res): Promise<any> {

        const response = await this.warehouseService.deleteWarehouse(warehouseId);
        if (response.status === false) {
            return res.status(response.code).json(response);
        }
        return res.status(HttpStatus.OK).json(response);

    }

    @Patch(':warehouseid/updatewarehouse')
    @UseGuards(AuthGuard('jwt'))

    async updatewarehouse(@Param('warehouseid') id,@Request() req, @Res() res, @Body() body: UpdateWarehouseDto) {

        const response = await this.warehouseService.update(body,id,req.user.email);
        if (response.status === false) {
            return res.status(response.code).json(response);
        }
        return res.status(HttpStatus.OK).json(response);

    }
}
