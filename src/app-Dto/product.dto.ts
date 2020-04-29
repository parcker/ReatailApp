
import { ApiModelProperty } from "@nestjs/swagger";

export class CreatProductDto{

    
    @ApiModelProperty({ required: true})
    
    public name: string;

    
    @ApiModelProperty({ required: true})
  
    public itemcode: string;

    
    @ApiModelProperty({ required: true})
    
    public description: string;

    
    @ApiModelProperty({ required: true})
  
    public packingtype: string;
    
    @ApiModelProperty({ required: true})
    
    public packs: number;

    @ApiModelProperty({ required: true})
    
    public expiredenabled: boolean;
    
  
    @ApiModelProperty({ required: true})
  
    public categoryId:string;

   
  
    @ApiModelProperty({ required: true})
  
    public subcategoryId:string;

}

export class UpdateProductDto{

    
    @ApiModelProperty({ required: true})
    
    public name: string;

    
    @ApiModelProperty({ required: true})
  
    public itemcode: string;

    
    @ApiModelProperty({ required: true})
    
    public description: string;

    
    @ApiModelProperty({ required: true})
  
    public packingtype: string;
    
    @ApiModelProperty({ required: true})
    
    public packs: number;

    @ApiModelProperty({ required: true})
    
    public expiredenabled: boolean;

    @ApiModelProperty({ required: true})
    
    public isdisabled: boolean;
    
  
    @ApiModelProperty({ required: true})
  
    public categoryId:string;

   
  
    @ApiModelProperty({ required: true})
  
    public subcategoryId:string;

}
export class ProductStatusDto{

    
    @ApiModelProperty({ required: true})
    public status: boolean;

  
    @ApiModelProperty({ required: true})
  
    public productId:string;

}