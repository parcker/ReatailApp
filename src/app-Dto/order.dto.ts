
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


