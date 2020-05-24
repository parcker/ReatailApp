
import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";

export class CreatProductDto{

    
    @ApiModelProperty({ required: true})
    name: string;
    @ApiModelProperty({ required: true})
    itemcode: string;
    @ApiModelProperty({ required: true})
    description: string;
    @ApiModelProperty({ required: true})
    packingtype: string;
    @ApiModelProperty({ required: true})
    packs: number;
    @ApiModelProperty({ required: true})
    expiredenabled: boolean;
    @ApiModelProperty({ required: true})
    categoryId:string;
    @ApiModelProperty({ required: true})
  
    subcategoryId:string;
   
}

export class UpdateProductDto{

    
    @ApiModelProperty({ required: true})
    
    public name: string;

    
    @ApiModelProperty({ required: true})
  
    public itemcode: string;

    
    
    @ApiModelPropertyOptional()
    public description: string;

    
    @ApiModelPropertyOptional()
  
    public packingtype: string;
    
    @ApiModelPropertyOptional()
    
    public packs: number;

    @ApiModelPropertyOptional()
    
    public expiredenabled: boolean;

    @ApiModelPropertyOptional()
    
    public isdisabled: boolean;
    
  
    @ApiModelProperty({ required: true})
  
    public categoryId:string;

   
  
    @ApiModelPropertyOptional()
  
    public subcategoryId:string;

}
export class ProductStatusDto{

    
    @ApiModelProperty({ required: true})
    public status: boolean;

  
    @ApiModelProperty({ required: true})
  
    public productId:string;

}