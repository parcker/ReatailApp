import { Body, Controller, Post, UseGuards,Request, Res, HttpStatus, UsePipes, ValidationPipe, Get, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags } from '@nestjs/swagger';
import { validate } from 'class-validator';
import { PaginationDto } from '../../../app-Dto/merchant/product.dto';
import { TransferRequestApprovalDto, TransferRequestApproveItemsDto, TransferRequestDto } from '../../../app-Dto/merchant/transferRequest.dto';
import { TransferItemStatus, TransferStatus, TransferType } from '../../../enums/settings.enum';
import { StocktransferService } from './stocktransfer.service';

@ApiUseTags('stocktransfer')
@Controller('/api/stocktransfer')
export class StocktransferController {


    constructor(private readonly _stockTransferService: StocktransferService)
     { }

     @Post('/create')
     @UseGuards(AuthGuard('jwt'))
     async create(@Body() transferDto: TransferRequestDto, @Request() req, @Res() res) {
         const response = await this._stockTransferService.postTransfer(transferDto,req.user.id);
         if (response.status === false) {
             return res.status(response.code).json(response);
         }
         
         return res.status(HttpStatus.OK).json(response);
 
     }
     @Post('/approve')
     @UseGuards(AuthGuard('jwt'))
     async approve(@Body() transferDto: TransferRequestApprovalDto, @Request() req, @Res() res) {
         const response = await this._stockTransferService.approvetransaction(transferDto,req.user.id);
         if (response.status === false) {
             return res.status(response.code).json(response);
         }
         
         return res.status(HttpStatus.OK).json(response);
 
     }
    
     @Get('/getTransfersforApproval')
     @UseGuards(AuthGuard('jwt'))
     async getTransfersforApproval(@Query() paginationDto: PaginationDto, @Request() req, @Res() res) {

          paginationDto.page = Number(paginationDto.page);
          paginationDto.limit = Number(paginationDto.limit);
         const response = await this._stockTransferService.getTransfers(paginationDto,TransferType.Transfer,TransferItemStatus.Pending,req.user.business);
         if (response.status === false) {
             return res.status(response.code).json(response);
          }
         
         return res.status(HttpStatus.OK).json(response);
 
     }
     @Get('/getRequestforApproval')
     @UseGuards(AuthGuard('jwt'))
     async getRequestforApproval(@Query() paginationDto: PaginationDto, @Request() req, @Res() res) {

         paginationDto.page = Number(paginationDto.page);
         paginationDto.limit = Number(paginationDto.limit);
         const response = await this._stockTransferService.getRequests(paginationDto,TransferType.Request ,TransferItemStatus.Pending,req.user.business);
         if (response.status === false) {
             return res.status(response.code).json(response);
         }
         
         return res.status(HttpStatus.OK).json(response);
 
     }

     @Get('/getTransfers')
     @UseGuards(AuthGuard('jwt'))
     async getTransfers(@Query() paginationDto: PaginationDto, @Request() req, @Res() res) {

          paginationDto.page = Number(paginationDto.page);
          paginationDto.limit = Number(paginationDto.limit);
         const response = await this._stockTransferService.getTransfers(paginationDto,TransferType.Transfer,TransferStatus.Completed,req.user.business);
         if (response.status === false) {
             return res.status(response.code).json(response);
          }
         
         return res.status(HttpStatus.OK).json(response);
 
     }
     @Get('/getRequest')
     @UseGuards(AuthGuard('jwt'))
     async getRequest(@Query() paginationDto: PaginationDto, @Request() req, @Res() res) {

         paginationDto.page = Number(paginationDto.page);
         paginationDto.limit = Number(paginationDto.limit);
         const response = await this._stockTransferService.getRequests(paginationDto,TransferType.Request ,TransferStatus.Completed,req.user.business);
         if (response.status === false) {
             return res.status(response.code).json(response);
         }
         
         return res.status(HttpStatus.OK).json(response);
 
     }
}
