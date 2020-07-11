
import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
export class ProductConfigurationDto {

    @ApiModelPropertyOptional()
    public imagelink: string;
  
    @ApiModelPropertyOptional()
    expiredenabled: boolean;
    @ApiModelPropertyOptional()
    pack: number;
    @ApiModelPropertyOptional()
    leadtime: number;
    @ApiModelPropertyOptional()
    public canexpire: boolean;
    @ApiModelPropertyOptional()
    public canbesold: boolean;
    @ApiModelPropertyOptional()
    public canbepurchased: boolean;
    @ApiModelPropertyOptional()
    public anypromo: boolean;
}
export class CreatProductDto {


    @ApiModelProperty({ required: true })
    name: string;
    @ApiModelProperty({ required: true })
    itemcode: string;
    @ApiModelPropertyOptional()
    description: string;
    @ApiModelProperty({ required: true })
    categoryId: string;
    @ApiModelPropertyOptional()
    subcategoryId: string;
    @Type(() => ProductConfigurationDto)
    @ApiModelPropertyOptional({ type: ProductConfigurationDto })
    productconfiguration: ProductConfigurationDto

}

export class UpdateProductDto {


    @ApiModelProperty({ required: true })
    public name: string;
    @ApiModelProperty({ required: true })
    public itemcode: string;
    @ApiModelPropertyOptional()
    public description: string;
    @ApiModelProperty({ required: true })
    public categoryId: string;
    @ApiModelPropertyOptional()
    public subcategoryId: string;
    @ApiModelPropertyOptional()
    public isdisabled: boolean;
    // @Type(() => ProductConfigurationDto)
    // @ApiModelPropertyOptional({ type: ProductConfigurationDto })
    // productconfiguration: ProductConfigurationDto
    // @ApiModelPropertyOptional()
    // public packingtype: string;
    // @ApiModelPropertyOptional()
    // public packs: number;
    // @ApiModelPropertyOptional()
    // public expiredenabled: boolean;
  

}
export class ProductStatusDto {


    @ApiModelProperty({ required: true })
    public status: boolean;
    @ApiModelProperty({ required: true })
    public productId: string;

}