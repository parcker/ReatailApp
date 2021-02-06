import { Body, Controller, Post, UseGuards,Request, Res, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags } from '@nestjs/swagger';
import { validate } from 'class-validator';
import { TransferRequestDto } from '../../../app-Dto/merchant/transferRequest.dto';
import { StocktransferService } from './stocktransfer.service';

@ApiUseTags('stocktransfer')
@Controller('/api/stocktransfer')
export class StocktransferController {


    constructor(private readonly _stockTransferService: StocktransferService)
     { }

     @Post('/create')
     @UseGuards(AuthGuard('jwt'))
    // @UsePipes(new ValidationPipe({ transform: true }))
     async create(@Body() transferDto: TransferRequestDto, @Request() req, @Res() res) {
         const response = await this._stockTransferService.postTransfer(transferDto,req.user.id);
         if (response.status === false) {
             return res.status(response.code).json(response);
         }
         
         return res.status(HttpStatus.OK).json(response);
 
     }
}
