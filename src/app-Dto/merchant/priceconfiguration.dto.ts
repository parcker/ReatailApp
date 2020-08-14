import { ApiModelProperty } from "@nestjs/swagger";

export class PriceConfigurationDto {

    @ApiModelProperty({ required: true, example: 'abd121-33434-34343' })
    productId: string;

    @ApiModelProperty({ required: true, example: 'abd121-33434-34343' })
    priceConfigId: string;

    @ApiModelProperty({ required: true, example: '10.0,5' })
    markup: number;
    @ApiModelProperty({ required: true, example: '300' })
    unitcostprice: number;
    @ApiModelProperty({ required: true, example: '300' })
    retailsellingprice: number;
    @ApiModelProperty({ required: true, example: '300' })
    wholesalecostprice: number;
    @ApiModelProperty({ required: true, example: '300' })
    wholesalesellingprice: number;
    @ApiModelProperty({ required: true})
    anyretaildiscount: boolean;
    @ApiModelProperty({ required: true})
    anywholesalediscount: boolean;
    @ApiModelProperty({ required: true, example: '(percentage or value)' })
    discountype: number;
   
}