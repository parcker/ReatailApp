
import {IsNotEmpty} from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";
export class CreateRoleDto{

    @ApiModelProperty({ required:true,example:'cashier or business admin' })
    @IsNotEmpty()
    name:string;

}
export interface RoleDto 
{
     id: string;
     name: string;
  
}
export class AssignRoleDto{

    @ApiModelProperty({ required:true,example:'739641da-14f0-48d9-b751-142425dc6eda' })
    @IsNotEmpty()
    userId:string;
    @ApiModelProperty({ required:true,example:'739641da-14f0-48d9-b751-142425dc6eda' })
    @IsNotEmpty()
    roleId:string;

}