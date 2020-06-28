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