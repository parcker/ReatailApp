import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
export class CreatePaymentTermDto{

   
    @ApiModelProperty({ required: true})
    name:string;
    @ApiModelProperty({ required: true})
    noofdays:number;

}