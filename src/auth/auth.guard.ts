import { Injectable, CanActivate, ExecutionContext, SetMetadata, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserType } from '../enums/settings.enum';
import * as jwt from 'jsonwebtoken';

export const ROLES_KEY = 'UserType';
export const UserTypes = (roles: UserType) => SetMetadata(ROLES_KEY, roles);


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  
  canActivate(context: ExecutionContext): boolean {
    const requiredUserTypes = this.reflector.getAllAndOverride<UserType[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
  
    if (!requiredUserTypes) {
      return true;
    }
    const  user  = context.switchToHttp().getRequest();
    const token = (user.headers.authorization as string).split(' ')[1];
    let decoded: any;
    try {

                    
        decoded = jwt.verify(token, process.env.SECRET);
       
       
    } 
    catch (e) {
        if (e.name === 'TokenExpiredError') throw new HttpException('Expired token', HttpStatus.UNAUTHORIZED);
        console.log('RolesGuard Error',e.name);
        throw new HttpException('Authentication Error', HttpStatus.UNAUTHORIZED);
    }
    console.log('Application UserType Information',decoded.userType_id,requiredUserTypes);
    return requiredUserTypes===decoded.userType_id?  true: false

  }
 
}

