import { ApiModelProperty } from "@nestjs/swagger";

export class AddMarchantUserRoleDto{
   
    @ApiModelProperty({ required: true, example: '342432-34234-343fdr-342342234fsdf' })
    userid:string;
    @ApiModelProperty({ required: true, example: '342432-34234-343fdr-342342234fsdf' })
    roleId:string;
    

}
export class UpdateMarchantUserRoleDto{
   
    @ApiModelProperty({ required: true, example: '342432-34234-343fdr-342342234fsdf' })
    userid:string;
    @ApiModelProperty({ required: true, example: '342432-34234-343fdr-342342234fsdf' })
    roleId:string;
    @ApiModelProperty({ required: true, example: '342432-34234-343fdr-342342234fsdf' })
    id:string;
    

}
export class GetMarchantUserRoleDto{
   
    email:string;
    userFirstname:string;
    userLastname:string;
    roleId:string;
    id:string;

}