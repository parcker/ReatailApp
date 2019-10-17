import { Controller, Post, UsePipes, ValidationPipe, Body, HttpException, HttpStatus, UseGuards,Request } from '@nestjs/common';
import { BusinesslocationService } from './businesslocation.service';
import { CreateBusinessLocationDto } from '../app-Dto/usermgr/company/company.dto';

@Controller('businesslocation')
export class BusinesslocationController {
    constructor(  private readonly businessloactionService: BusinesslocationService) {}

    
    @Post('/stores')
    @UsePipes(new ValidationPipe())
    public async CreatStores(@Request() req,@Body() body: CreateBusinessLocationDto[]){
  
        
        const response = await this.businessloactionService.create(body[0].name,body[0].address,'','');
        if(response.status==false){throw new HttpException(response.message, HttpStatus.BAD_REQUEST);}
        return response;
        
    }
}
