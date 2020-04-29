import { Controller, Post, UsePipes, ValidationPipe, Body, HttpException, HttpStatus, UseGuards,Request } from '@nestjs/common';
import { BusinesslocationService } from './businesslocation.service';
import { CreateBusinessLocationDto } from '../app-Dto/usermgr/company/company.dto';
import { AuthGuard } from '@nestjs/passport';


@Controller('/api/businesslocation')
export class BusinesslocationController {
    constructor(  private readonly businessloactionService: BusinesslocationService) {}

    
    @Post('/stores')
    @UseGuards(AuthGuard('jwt'))
    
    public async CreatStores(@Request() req,@Body() body: CreateBusinessLocationDto){
  
 
        const response = await this.businessloactionService.create(body.name,body.address,req.user.businessId,req.user.id);
        if(response.status===false){throw new HttpException(response, HttpStatus.BAD_REQUEST);}
        return response;
        
    }
}
