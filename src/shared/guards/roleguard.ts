import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ActivityAction } from '../../enums/settings.enum';

@Injectable()
export class AuthorizatioGuard implements CanActivate {

  constructor(private readonly activityAction: ActivityAction) {
      
  }

  canActivate( context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> 
  {
   
    //const activityAction = this.activityAction.;
    const request = context.switchToHttp().getRequest();
    return true;
   // return IsAuthorized(request);
  }

}