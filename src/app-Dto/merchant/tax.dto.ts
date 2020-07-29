import { ApiModelProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class TaxDto {


    @ApiModelProperty({ required: true })
    name: string;
    @ApiModelProperty({ required: true })
    code: string;
    @ApiModelProperty({ required: true })
    value: number;
   
}