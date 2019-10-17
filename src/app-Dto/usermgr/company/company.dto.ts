import {IsNotEmpty, IsString} from "class-validator";
import { ApiModelPropertyOptional, ApiModelProperty } from "@nestjs/swagger";

export class CreateCompanyDto{
 
    @IsNotEmpty()
    @ApiModelProperty({ required: true, example: 'Mobile company' })
    comapanyName:string;
    @IsNotEmpty()
    @ApiModelProperty({ required: true, example: 'maxwell street' })
    address:string;

}
export class CreateBusinessLocationDto{
 
    @IsNotEmpty()
    @ApiModelProperty({ required: true, example: 'business loaction name' })
    name:string;
    @IsNotEmpty()
    @ApiModelProperty({ required: true, example: 'maxwell street' })
    address:string;

}
export interface IbusinessLocationDto{
    id:string;
    name:string;
    address:string;
    createdby:string;
  
}