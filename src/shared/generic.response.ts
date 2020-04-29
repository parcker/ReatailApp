export class ResponseObj<T>{
  message:string;
  status:boolean;
  code:number;
  result:T;
}
