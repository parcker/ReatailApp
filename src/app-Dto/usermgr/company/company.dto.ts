import {IsNotEmpty} from "class-validator";
import { ApiModelPropertyOptional } from "@nestjs/swagger";
export class CreateCompanyDto{

    @ApiModelPropertyOptional({ example: 'info tech' })
    @IsNotEmpty()
    comapanyName:string;

    @ApiModelPropertyOptional()
    @IsNotEmpty()
    address:string;

}