export class ResponseObj<T>{
  message:string;
  status:boolean;
  result:T;
}
export class ErrorResponseObj<T>{
    message:string;
    errcode:string;
   
}