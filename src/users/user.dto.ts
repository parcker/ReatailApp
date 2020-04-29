import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';


export class CreateUserDto {
    @ApiModelProperty({ required: true, example: 'john@example.com' })
 
    public readonly email: string;
    @ApiModelProperty({ required: true, example: 'changeme' })
  
    public readonly password: string;

  
    @ApiModelProperty({ example: 'John' })
    public readonly firstName: string;

  
    @ApiModelPropertyOptional({ example: 'Doe' })
    public readonly lastName: string;

  
    @ApiModelPropertyOptional({ example: '+234809944547' })
    public readonly phonenumber: string;
}
