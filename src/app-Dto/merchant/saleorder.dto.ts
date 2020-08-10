import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";


export class SalesItemDto{

    @ApiModelProperty({ required: true})
    public productId: string;

    @ApiModelProperty({ required: true})
    public warehouseId: string;

    @ApiModelProperty({ required: true})
    public taxValue: number;

    @ApiModelProperty({ required: true})
    public tax: number;

    @ApiModelProperty({ required: true})
    public unitQty: number;

    @ApiModelProperty({ required: true})
    public ctnQty: number;

    @ApiModelProperty({ required: true})
    public price: number;

    @ApiModelProperty({ required: true})
    public lineamount: number;
}

export class SaleOrderDto{

   
    @ApiModelProperty({ required: true})
    public customerId: string;

    @ApiModelPropertyOptional()
    paymenttermId:string;
    
    @ApiModelProperty({ required: true})
    additionalinfo: string;
   
    @ApiModelProperty({ required: true})
    deliveryDate: Date;

    @ApiModelProperty({ required: true})
    total: number;

    @ApiModelProperty({ required: true})
    subTotal: number;

    @ApiModelProperty({ required: true})
    taxTotal: number;

    @ApiModelProperty({ required: true})
    totalcharges: number;

    @ApiModelProperty({ required: true})
    saleType:number;

    @ApiModelProperty({ required: true})
    chargesinfo: string;

    @ApiModelPropertyOptional()
    emailsaleOrder: boolean;

    @ApiModelProperty({ type: [SalesItemDto] })
    @Type(() => SalesItemDto)
    salesItems:SalesItemDto[]

}

