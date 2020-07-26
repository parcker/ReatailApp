import { Injectable } from '@nestjs/common';
import { ResponseObj } from '../generic.response';

@Injectable()
export class ApiResponseService {

    constructor() {
       
    }

    async SuccessResponse <T> (message:string,code:number,data: any):Promise<any>{

        let result = new ResponseObj<T>();
        result.message = message;
        result.status = true;
        result.code = code;
        result.result = data;
        return result;
    }
   
    async FailedBadRequestResponse <T> (message:string,code:number,data: any):Promise<any>{

        let result = new ResponseObj<T>();
        result.message = message;
        result.status = false;
        result.code = code;
        result.result = data;
        return result;
    }
}