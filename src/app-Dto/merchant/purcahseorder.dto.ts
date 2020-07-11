import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
export class CreatePurchaseOrderHeaderDto{

   
    @ApiModelProperty({ required: true})
    public supplierId: string;
    @ApiModelPropertyOptional()
    invoiceNumber:string;
    @ApiModelProperty({ required: true})
    shiptobusinessId: string;
   
    @ApiModelProperty({ required: true})
    duedate: Date;

}
export class PurchaseOrderItemDto{

    @ApiModelProperty({ required: true})
    public productId: string;

    @ApiModelProperty({ required: true})
    public quantity: number;

    @ApiModelProperty({ required: true})
    public carton: number;

    @ApiModelProperty({ required: true})
    public unitcost: number;
    
    @ApiModelProperty({ required: true})
    public totalCost: number;


    
}
export class CreatePurchaseOrderItemDto{

    
    @ApiModelProperty({ required: true})
    public purcahseId: number;
    @ApiModelProperty({ type: PurchaseOrderItemDto })
    @Type(() => PurchaseOrderItemDto)
    purchaseItems:PurchaseOrderItemDto[]
}