import { urlType } from "../../enums/settings.enum";
import { IsNotEmpty, IsInt, Min, Max } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

export class AppllicationRoutesDto{
    @IsNotEmpty()
    @ApiModelProperty({ required: true, example: 'api/dowork/wahoo' })
    url:string;
    @IsNotEmpty()
    @ApiModelProperty({ required: true, example: 'Api for Save transaction' })
    description:string;
    @IsInt()
    @Min(1)
    @Max(2)
    @ApiModelProperty({ required: true,})
    type:number;
   
}