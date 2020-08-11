import { ApiModelProperty } from "@nestjs/swagger";
export class SeedProductDto{

    @ApiModelProperty({ required: true, example: 'category test' })
    readonly productId:string;

    @ApiModelProperty({ required: true, example: 'category test' })
    readonly warehouseId:string;

    @ApiModelProperty({ required: true, example: 'category test' })
    readonly quantity:number;

    
    @ApiModelProperty({ required: true, example: 'category test' })
    readonly price:number;
    
}