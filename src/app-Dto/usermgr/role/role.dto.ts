
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