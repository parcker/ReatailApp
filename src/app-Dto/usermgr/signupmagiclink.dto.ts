import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";

export class SignUpMagicDto {


    @ApiModelProperty({ required: true })
    email: string;
    @ApiModelProperty({ required: true, })
    name: string;
    @ApiModelProperty({ required: true, })
    businesslocationId:string;
   
}