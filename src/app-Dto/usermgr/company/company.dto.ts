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