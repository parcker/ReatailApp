import { ApiModelProperty } from "@nestjs/swagger";

export class CreatCategoryDto{
   
    @ApiModelProperty({ required: true, example: 'category test' })
    readonly name:string;
    

}
export class UpdateCategoryDto{
   
    @ApiModelProperty({ required: true, example: 'category test' })
    name:string;
    
   
    @ApiModelProperty({ required: true, example: '342432-34234-343fdr-342342234fsdf' })
    id:string;
    
}
export class CreatSubCategoryDto{
   
    @ApiModelProperty({ required: true, example: 'subcategory test' })
    name:string;
   
    @ApiModelProperty({ required: true, example: '342432-34234-343fdr-342342234fsdf' })
    categoryId:string;

}
export class UpdateSubCategoryDto{
   
    @ApiModelProperty({ required: true, example: 'subcategory test' })
    name:string;
   
    @ApiModelProperty({ required: true, example: '342432-34234-343fdr-342342234fsdf' })
    categoryId:string;
    
   
    @ApiModelProperty({ required: true, example: '342432-34234-343fdr-342342234fsdf' })
    id:string;

}