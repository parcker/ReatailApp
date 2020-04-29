
import { ApiModelProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class CreateOrderitemDto{

   
    @ApiModelProperty({ required: true})
    productId: string;

    
    orderid: string;

  
    @ApiModelProperty({ required: true})
    qty:number;

    @ApiModelProperty({ required: true})
    cost:number;

    @ApiModelProperty({ required: true})
    unitprice:number;


}

export class CreateOrderDto{

   
    @ApiModelProperty({ required: true})
    public supplierid: string;

    @ApiModelProperty({ required: true})
    invoiceNumber:string;

    @ApiModelProperty({ required: true})
    totalcostprice:number;

    @ApiModelProperty({ required: true})
    businesslocationId: string;

   
    @Type(() => CreateOrderitemDto)
    @ApiModelProperty({ type: [CreateOrderitemDto]})
    Orderitem:CreateOrderitemDto[]


}
