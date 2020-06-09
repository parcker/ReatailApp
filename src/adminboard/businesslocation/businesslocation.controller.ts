import { Controller, Post, UsePipes, ValidationPipe, Body, HttpException, HttpStatus, UseGuards,Request, Res, Patch, Param, Get } from '@nestjs/common';
import { BusinesslocationService } from './businesslocation.service';
import { CreateBusinessLocationDto } from '../../app-Dto/usermgr/company/company.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateProductDto } from '../../app-Dto/product.dto';


@Controller('/api/businesslocation')
export class BusinesslocationController {
    constructor(  private readonly businessloactionService: BusinesslocationService) {}

    
    @Post('/stores')
    @UseGuards(AuthGuard('jwt'))
    public async CreatStores(@Request() req, @Res() res,@Body() body: CreateBusinessLocationDto){
  
 
        const response = await this.businessloactionService.create(body.name,body.address,req.user.businessId,req.user.id);
        if (response.status === false) {
            return res.status(response.code).json(response);
        }
        return res.status(HttpStatus.OK).json(response);

        
    }
    @Patch('/updateproduct/:id/:status')
    @UseGuards(AuthGuard('jwt'))
    async changeStoreStatus(@Param('id') id:string,@Param('status') status:boolean,@Request() req, @Res() res) {

        const response = await this.businessloactionService.businesslocationStatus(id,status,req.user.id);
        if (response.status === false) {
            return res.status(response.code).json(response);
        }
        return res.status(HttpStatus.OK).json(response);

    }
    @Get('/:buisnessId/:status')
    @UseGuards(AuthGuard('jwt'))
    async getstorebybusinesslocation(@Param('buisnessId') buisnessId:string,@Param('status') status:boolean,@Request() req, @Res() res) {

        const response = await this.businessloactionService.getbusinesslocation(status);
        if (response.status === false) {
            return res.status(response.code).json(response);
        }
        return res.status(HttpStatus.OK).json(response);

    }
}
