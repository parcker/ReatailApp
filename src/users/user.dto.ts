import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEmpty } from 'class-validator';

export class CreateUserDto {
    @ApiModelProperty({ required: true, example: 'john@example.com' })
    @IsEmail()
    @IsEmpty()
    public readonly email: string;
    @ApiModelProperty({ required: true, example: 'changeme' })
    @IsEmpty()
    public readonly password: string;

    @IsEmpty()
    @ApiModelProperty({ example: 'John' })
    public readonly firstName: string;

    @IsEmpty()
    @ApiModelPropertyOptional({ example: 'Doe' })
    public readonly lastName: string;

    @IsEmpty()
    @ApiModelPropertyOptional({ example: '+234809944547' })
    public readonly phonenumber: string;
}
