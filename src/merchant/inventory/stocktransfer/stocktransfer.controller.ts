import { Body, Controller, Post, UseGuards,Request, Res, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TransferRequestDto } from '../../../app-Dto/merchant/transferRequest.dto';
import { StocktransferService } from './stocktransfer.service';

@Controller('stocktransfer')
export class StocktransferController {


    constructor(private readonly _stockTransferService: StocktransferService)
     { }

     @Post('/create')
     @UseGuards(AuthGuard('jwt'))
 
     async create(@Body() transferDto: TransferRequestDto, @Request() req, @Res() res) {
 
       
         const response = await this._stockTransferService.postTransfer(transferDto);
         if (response.status === false) {
             return res.status(response.code).json(response);
         }
         
         return res.status(HttpStatus.OK).json(response);
 
     }
}
