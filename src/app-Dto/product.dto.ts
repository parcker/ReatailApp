import { IsNotEmpty, IsInt, IsBoolean, MaxLength, IsUUID, IsOptional } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

export class CreatProductDto{

    @IsNotEmpty()
    @ApiModelProperty({ required: true})
    @MaxLength(100)
    public name: string;

    @IsNotEmpty()
    @ApiModelProperty({ required: true})
    @MaxLength(50)
    public itemcode: string;

    @IsNotEmpty()
    @ApiModelProperty({ required: true})
    @MaxLength(100)
    public description: string;

    @IsNotEmpty()
    @ApiModelProperty({ required: true})
    @MaxLength(50)
    public packingtype: string;
    
    @ApiModelProperty({ required: true})
    @IsInt()
    public packs: number;

    @IsBoolean()
    public expiredenabled: boolean;
    
    @IsUUID()
    @ApiModelProperty({ required: true})
    @MaxLength(50)
    public categoryId:string;

    @IsOptional()
    @IsUUID()
    @ApiModelProperty({ required: true})
    @MaxLength(50)
    public subcategoryId:string;

}
export class ProductStatusDto{

    @IsBoolean()
    @ApiModelProperty({ required: true})
    public status: boolean;

    @IsUUID()
    @ApiModelProperty({ required: true})
    @MaxLength(50)
    public productId:string;

}