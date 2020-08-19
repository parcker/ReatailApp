
import { ApiModelPropertyOptional } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { PurchaseSearchType } from "../../enums/settings.enum"

export class SupplierSearchParametersDto {
    supplierId?: string
    startDate?: Date
    endDate?: Date
   
}
export class SearchParametersDto {
    
    startDate?: Date
    endDate?: Date
    postedBy?: string
    invoiceNumber?: string
    searchtype:PurchaseSearchType
    @Type(() => SupplierSearchParametersDto)
    @ApiModelPropertyOptional({ type: SupplierSearchParametersDto })
    supplierSearch: SupplierSearchParametersDto
}
