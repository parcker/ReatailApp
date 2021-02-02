import { ApiModelProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { TransferType } from "../../enums/settings.enum";

export class TransferRequestItemsDto{

    @ApiModelProperty({ required: true })
    poductId: string;
    @ApiModelProperty({ required: true })
    quantity:Number
    @ApiModelProperty({ required: true })
    warehouseId: string;



}

export class TransferRequestDto{

    @ApiModelProperty({ required: true })
    note: string;
    @ApiModelProperty({ required: true })
    type:TransferType
    @ApiModelProperty({ type: [TransferRequestItemsDto] })
    @Type(() => TransferRequestItemsDto)
    items:TransferRequestItemsDto[]
}

