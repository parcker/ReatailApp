import { ApiModelProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { TransferType } from "../../enums/settings.enum";
import {IsDefined, IsNotEmpty, Min, ValidateNested} from "class-validator"

export class WarehouseLocationDto{

    @ApiModelProperty({ required: false })
    origin: string;
    @ApiModelProperty({ required: false })
    destination:string
 
}

export class TransferRequestItemsDto extends WarehouseLocationDto{

    @ApiModelProperty({ required: true })
    poductId: string;
    @ApiModelProperty({ required: true })
    @Min(1)
    quantity:number
 
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

export class TransferRequestApproveItemsDto{

    @ApiModelProperty({ required: true })
    poductId: string;
    @ApiModelProperty({ required: true })
    @Min(1)
    quantity:number
 
}

export class TransferRequestApprovalDto{

    @ApiModelProperty({ required: true })
    stocktransferid: string;
    @ApiModelProperty({ type: [TransferRequestApproveItemsDto] })
    @Type(() => TransferRequestApproveItemsDto)
    items:TransferRequestApproveItemsDto[]
}


