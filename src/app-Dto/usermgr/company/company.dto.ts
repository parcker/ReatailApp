
import { ApiModelPropertyOptional, ApiModelProperty } from "@nestjs/swagger";

export class CreateCompanyDto{
 
   
    @ApiModelProperty({ required: true, example: 'Mobile company' })
    comapanyName:string;
   
    @ApiModelProperty({ required: true, example: 'maxwell street' })
    address:string;

}
export class CreateBusinessLocationDto{
 
   
    @ApiModelProperty({ required: true, example: 'business loaction name' })
    name:string;
   
    @ApiModelProperty({ required: true, example: 'maxwell street' })
    address:string;

}
export interface IbusinessLocationDto{
    id:string;
    name:string;
    address:string;
    createdby:string;
  
}