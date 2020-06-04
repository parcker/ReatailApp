import { Controller, Post, UseGuards, UsePipes, ValidationPipe, Body, HttpException, HttpStatus,Request } from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateOrderDto } from '../../../app-Dto/order.dto';

@Controller('/api/order')
export class OrderController {

    constructor(readonly orderService: OrderService) {
        
    }

    @Post('/creat')
    @UseGuards(AuthGuard('jwt'))
    
  
    async creatcategory(@Request() req,@Body() body: CreateOrderDto,){
    
        const response = await this.orderService.postorder(body,req.user.id,req.user.businessId);
        if(response.status===false){throw new HttpException(response, HttpStatus.BAD_REQUEST);}
        return response;
    }

}
