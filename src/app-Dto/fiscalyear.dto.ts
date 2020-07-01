
import { ApiModelProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class FiscalYearDto {


    @ApiModelProperty({ required: true })
    name: string;
    @ApiModelProperty({ required: true })
    startdate: Date;
    @ApiModelProperty({ required: true })
    enddate: Date;
    @ApiModelProperty({ required: true })
    iscurrent: boolean;


}