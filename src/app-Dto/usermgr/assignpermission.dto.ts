
import { IsNotEmpty, IsInt, Min, Max } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

export class AssignPermissionDto{
    @IsNotEmpty()
    @ApiModelProperty({ required: true, example: '739641da-14f0-48d9-b751-142425dc6eda' })
    userId:string;
    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    routeId:string[];
  
   
}