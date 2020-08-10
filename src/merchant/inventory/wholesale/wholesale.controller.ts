import { Controller, Post, UseGuards, Body, Res, HttpStatus,Request } from '@nestjs/common';
import { WholesaleService } from './wholesale.service';
import { AuthGuard } from '@nestjs/passport';
import { CreatProductDto } from '../../../app-Dto/merchant/product.dto';
import { SaleOrderDto } from '../../../app-Dto/merchant/saleorder.dto';

@Controller('/api/wholesale')
export class WholesaleController {
constructor(private readonly  wholesaleService:WholesaleService) {}

    @Post('/postSalesOrder')
    @UseGuards(AuthGuard('jwt'))
    async postSalesOrder(@Body() salesorder: SaleOrderDto, @Request() req, @Res() res) {

        const response = await this.wholesaleService.salesOrderInfo(salesorder, req.user.id, req.user.business,req.user.businesslocation);
        if (response.status === false) {
            return res.status(response.code).json(response);
        }
        
        return res.status(HttpStatus.OK).json(response);

    }

}
