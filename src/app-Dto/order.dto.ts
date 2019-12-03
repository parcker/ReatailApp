import { IsNotEmpty, MaxLength, IsNumber, Min, ValidateNested, IsOptional } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class CreateOrderitemDto{

    @IsNotEmpty()
    @ApiModelProperty({ required: true})
    @MaxLength(100)
    productId: string;

    @IsOptional()
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
    @Min(100)
    @ApiModelProperty({ required: true})
    totalcostprice:number;


    @IsNotEmpty()
    @ApiModelProperty({ required: true})
    @MaxLength(100)
    businesslocationId: string;

    @ValidateNested({ each: true })
    @Type(() => CreateOrderitemDto)
    @ApiModelProperty({ type: [CreateOrderitemDto]})
    Orderitem:CreateOrderitemDto[]


}
