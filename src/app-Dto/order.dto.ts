import { IsNotEmpty, IsInt, IsBoolean, MaxLength, IsUUID, IsOptional, IsNumber, Max, Min } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";
import { isNumber } from "util";

export class CreateOrderDto{

    @IsNotEmpty()
    @ApiModelProperty({ required: true})
    @MaxLength(100)
    public supplierid: string;

    
    @MaxLength(100)
    @IsNotEmpty()
    @ApiModelProperty({ required: true})
    invoiceNumber:string;

    @IsNumber()
    @ApiModelProperty({ required: true})
    orderstatus:number;

    @IsNumber()
    @Min(100)
    @ApiModelProperty({ required: true})
    totalcostprice:number;

    @IsNotEmpty()
    @ApiModelProperty({ required: true})
    @MaxLength(100)
    public buisnessId: string;

    @IsNotEmpty()
    @ApiModelProperty({ required: true})
    @MaxLength(100)
    public businesslocationId: string;


}
export class CreateOrderitemDto{

    @IsNotEmpty()
    @ApiModelProperty({ required: true})
    @MaxLength(100)
    productId: string;

    @IsNotEmpty()
    @ApiModelProperty({ required: true})
    @MaxLength(100)
    orderid: string;

    @IsNumber()
    @ApiModelProperty({ required: true})
    qty:number;

    @IsNumber()
    @ApiModelProperty({ required: true})
    cost:number;

    @IsNumber()
    @ApiModelProperty({ required: true})
    unitprice:number;


}