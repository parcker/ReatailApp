import { ApiModelProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class MarchantModuleDto{
   
    @ApiModelProperty({ required: true, example: ' test' })
     name:string;
    @ApiModelProperty({ required: true, example: ' test' })
     businessId:string;

}

export class UpdateMarchantModuleDto{
   
    @ApiModelProperty({ required: true, example: ' test' })
    name:string;
    @ApiModelProperty({ required: true, example: '2900-ddsds-3333-dsdsdsds-d' })
    Id:string;

}


export class MerchantRolePermissionItemDto{

    @ApiModelProperty({ required: true, example: '2900-ddsds-3333-dsdsdsds-d' })
    moduleId: string;
    @ApiModelProperty({ required: true, example: '2900-ddsds-3333-dsdsdsds-d' })
    roleId: string;
    @ApiModelProperty()
    CanDelete:boolean;
    @ApiModelProperty()
    CanCreate:boolean;
    @ApiModelProperty()
    CanUpdate:boolean;
    @ApiModelProperty()
    CanView:boolean;
    @ApiModelProperty()
    CanApprove:boolean;
    @ApiModelProperty()
    CanReject:boolean;
    @ApiModelProperty()
    CanUpload:boolean;
    @ApiModelProperty()
    CanDownLoad:boolean;
}


export class MerchantRolePermissionDto{

    @ApiModelProperty({ type: [MerchantRolePermissionItemDto] })
    @Type(() => MerchantRolePermissionItemDto)
    model:MerchantRolePermissionItemDto[]
}