

import { ApiModelProperty } from "@nestjs/swagger";
export class CreateRoleDto{

    @ApiModelProperty({ required:true,example:'cashier or business admin' })
   
    name:string;


}
export interface RoleDto 
{
     id: string;
     name: string;
  
}
export class AssignRoleDto{

    @ApiModelProperty({ required:true})
   
    userIds:string[];
    @ApiModelProperty({ required:true,example:'739641da-14f0-48d9-b751-142425dc6eda' })

    roleId:string;

}