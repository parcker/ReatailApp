import { ApiModelProperty } from "@nestjs/swagger";

export class MarchantModuleDto{
   
    @ApiModelProperty({ required: true, example: ' test' })
     name:string;
    @ApiModelProperty({ required: true, example: ' test' })
     businessId:string;

}

export class UpdateMarchantModuleDto{
   
    @ApiModelProperty({ required: true, example: ' test' })
    name:string;
    @ApiModelProperty({ required: true, example: '2900-ddsds-3333-dsdsdsds-d' })
    Id:string;

}