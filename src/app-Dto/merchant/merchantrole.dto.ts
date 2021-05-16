import { ApiModelProperty } from "@nestjs/swagger";

export class MarchantRoleDto{
   
    @ApiModelProperty({ required: true, example: 'category test' })
    readonly name:string;
    

}
export class UpdateMarchantRoleDto{
   
    @ApiModelProperty({ required: true, example: 'category test' })
    readonly name:string;

    @ApiModelProperty({ required: true, example: '342432-34234-343fdr-342342234fsdf' })
    id:string;
    

}
export class GetMarchantRoleDto{
   
    @ApiModelProperty({ required: true, example: 'category test' })
    readonly name:string;
    
    @ApiModelProperty({ required: true, example: '342432-34234-343fdr-342342234fsdf' })
    id:string;

}
