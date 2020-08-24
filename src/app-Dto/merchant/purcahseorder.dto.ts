import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { TransactionStatusEnum } from "../../enums/settings.enum";

export class PurchaseOrderItemDto{

    @ApiModelProperty({ required: true})
    public productId: string;

    @ApiModelProperty({ required: true})
    public unitquantity: number;

    @ApiModelProperty({ required: true})
    public ctnquanity: number;

    @ApiModelProperty({ required: true})
    public retailcost: number;

    @ApiModelProperty({ required: true})
    public wholesalecost: number;
    
    @ApiModelProperty({ required: true})
    public lineretailcost: number;

    @ApiModelProperty({ required: true})
    public linewholesalecost: number;


    
}
export class CreatePurchaseOrderDto{

    @ApiModelProperty({ required: true})
    public supplierId: string;

    @ApiModelPropertyOptional()
    invoiceNumber:string;

    @ApiModelProperty({ required: true})
    shiptobusinessId: string;
   
    @ApiModelProperty({ required: true})
    warehouseId: string;

    @ApiModelProperty({ required: true})
    duedate: Date;
    
    
    @ApiModelProperty({ type: [PurchaseOrderItemDto] })
    @Type(() => PurchaseOrderItemDto)
    purchaseItems:PurchaseOrderItemDto[]
}
export class ApprovePurchaseOrderDto{

    @ApiModelProperty({ required: true})
    public purchaseorderId: number;

    @ApiModelProperty()
    status: boolean;

    @ApiModelProperty()
    comment?: string;
   
  
}