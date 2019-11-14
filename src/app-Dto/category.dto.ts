import { IsNotEmpty, IsInt, Min, Max } from "class-validator";

import { ApiModelProperty } from "@nestjs/swagger";

export class CreatCategoryDto{
    @IsNotEmpty()
    @ApiModelProperty({ required: true, example: 'category test' })
    name:string;
    

}
export class UpdateCategoryDto{
    @IsNotEmpty()
    @ApiModelProperty({ required: true, example: 'category test' })
    name:string;
    
    @IsNotEmpty()
    @ApiModelProperty({ required: true, example: '342432-34234-343fdr-342342234fsdf' })
    id:string;
    
}
export class CreatSubCategoryDto{
    @IsNotEmpty()
    @ApiModelProperty({ required: true, example: 'subcategory test' })
    name:string;
    @IsNotEmpty()
    @ApiModelProperty({ required: true, example: '342432-34234-343fdr-342342234fsdf' })
    categoryId:string;

}
export class UpdateSubCategoryDto{
    @IsNotEmpty()
    @ApiModelProperty({ required: true, example: 'subcategory test' })
    name:string;
    @IsNotEmpty()
    @ApiModelProperty({ required: true, example: '342432-34234-343fdr-342342234fsdf' })
    categoryId:string;
    
    @IsNotEmpty()
    @ApiModelProperty({ required: true, example: '342432-34234-343fdr-342342234fsdf' })
    id:string;

}