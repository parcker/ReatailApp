import { Controller, Post, UseGuards, UsePipes, ValidationPipe, Body, HttpException, HttpStatus,Request } from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateOrderDto } from '../../../app-Dto/order.dto';

@Controller('/api/order')
export class OrderController {

    constructor(readonly orderService: OrderService) {
        
    }

  

}
