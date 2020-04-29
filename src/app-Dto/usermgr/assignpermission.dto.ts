

import { ApiModelProperty } from "@nestjs/swagger";

export class AssignPermissionDto{
    
    @ApiModelProperty({ required: true, example: '739641da-14f0-48d9-b751-142425dc6eda' })
    userId:string;
    
    @ApiModelProperty({ required: true })
    routeId:string[];
  
   
}