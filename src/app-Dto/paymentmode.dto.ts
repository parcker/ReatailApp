import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
export class CreatePaymentModeDto{

   
    @ApiModelProperty({ required: true})
    name:string;
   

}