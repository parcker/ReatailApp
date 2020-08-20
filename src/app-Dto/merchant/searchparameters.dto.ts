
import { ApiModelPropertyOptional, ApiModelProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { PurchaseSearchType } from "../../enums/settings.enum"
import { IsEnum } from "class-validator"
import { isDate } from "util"

export class SupplierSearchParametersDto {
    @ApiModelProperty({ required: true})
    supplierId: string
    
    @ApiModelProperty({ required: true})
    startDate: Date
    @ApiModelProperty({ required: true})
    endDate: Date
   
}

export class DateRangeSearchParametersDto {
    @ApiModelProperty({ required: true})
    startDate: Date
    @ApiModelProperty({ required: true})
    endDate: Date
   
}
export class SearchParametersDto {
    
   
    @ApiModelPropertyOptional()
    postedBy?: string

    @ApiModelPropertyOptional()
    invoiceNumber?: string

    @ApiModelProperty({ required: true, enum: PurchaseSearchType})
    searchtype:PurchaseSearchType

    @Type(() => SupplierSearchParametersDto)
    @ApiModelPropertyOptional({ type: SupplierSearchParametersDto })
    supplierSearch?: SupplierSearchParametersDto

    @Type(() => DateRangeSearchParametersDto)
    @ApiModelPropertyOptional({ type: DateRangeSearchParametersDto })
    daterangeSearch?: DateRangeSearchParametersDto
}
