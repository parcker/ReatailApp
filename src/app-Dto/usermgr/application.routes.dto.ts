import { urlType } from "../../enums/settings.enum";

import { ApiModelProperty } from "@nestjs/swagger";

export class AppllicationRoutesDto{
   
    @ApiModelProperty({ required: true, example: 'api/dowork/wahoo' })
    url:string;

    @ApiModelProperty({ required: true, example: 'Api for Save transaction' })
    description:string;
    
    @ApiModelProperty({ required: true,})
    type:number;
   
}