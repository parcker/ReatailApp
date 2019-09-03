
import {IsNotEmpty} from "class-validator";
export class CreateRoleDto{

    @IsNotEmpty()
    name:string;

}
export interface RoleDto 
{
     id: string;
     name: string;
  
}