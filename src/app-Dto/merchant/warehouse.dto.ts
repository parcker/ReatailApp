import { ApiModelProperty } from "@nestjs/swagger";

export class CreatWarehouseDto{
   
    @ApiModelProperty({ required: true, example: 'category test' })
    readonly name:string;
    
    @ApiModelProperty({ required: true, example: 'address of warehouse test' })
    readonly address:string;

    @ApiModelProperty({ required: true, example: '0934343j-343433-2323' })
    readonly businesslocationId:string;

}


export class UpdateWarehouseDto{
   
    @ApiModelProperty({ required: true, example: 'category test' })
    readonly name:string;
    
    @ApiModelProperty({ required: true, example: 'address of warehouse test' })
    readonly address:string;

    @ApiModelProperty({ required: true, example: '0934343j-343433-2323' })
    readonly businesslocationId:string;

    @ApiModelProperty({ required: true})
    isDisable:boolean;

}