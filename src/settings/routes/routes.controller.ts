import { Controller, UseGuards, UsePipes, ValidationPipe, Body, Post ,Request, Get, Param, HttpException, HttpStatus} from '@nestjs/common';
import { RoutesService } from './routes.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateBusinessLocationDto } from '../../app-Dto/usermgr/company/company.dto';
import { AppllicationRoutesDto } from '../../app-Dto/usermgr/application.routes.dto';
import { AssignPermissionDto } from '../../app-Dto/usermgr/assignpermission.dto';

@Controller('/api/routes')
export class RoutesController {

    constructor(private readonly routesService: RoutesService) {
      
    }

    @Post('/create')
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(new ValidationPipe())
    public async create(@Request() req, @Body() body: AppllicationRoutesDto){
          
         const response = await this.routesService.createRoute(body.url,body.description,body.type,req.user.id);
         if(response.status==false){throw new HttpException(response.message, HttpStatus.BAD_REQUEST);}
         return response;
        
    }
    @Get('/getroutes')
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(new ValidationPipe())
    public async getroutes(){
        
         const response = await this.routesService.getByRouteByType();
         return response;
        
    }
    @Post('/assignpermission')
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(new ValidationPipe())
    public async assignpermission(@Request() req, @Body() body: AssignPermissionDto){
          
         const response = await this.routesService.assignRouteToUser(body.routeId,body.userId,req.user.id);
         if(response.status==false){throw new HttpException(response.message, HttpStatus.BAD_REQUEST);}
         return response;
        
    }
}
