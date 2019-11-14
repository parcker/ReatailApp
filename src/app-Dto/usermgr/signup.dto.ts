import {IsNotEmpty, ValidateNested, IsEmail} from "class-validator";
import { CreateCompanyDto } from "./company/company.dto";
import { CreateUserDto } from "../../users/user.dto";
import { ApiModelProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class SigupDto{

    @ApiModelProperty({ type: CreateCompanyDto })
    @ValidateNested()
    @Type(() => CreateCompanyDto)
    company:CreateCompanyDto;

    @ApiModelProperty({ type: CreateUserDto })
    @ValidateNested()
    @Type(() => CreateUserDto)
    contactPerson:CreateUserDto;

}
export class CreateNonAdminUser {
    @IsNotEmpty()
    @IsEmail()
    @ApiModelProperty({ required: true})
    email: string;

    @IsNotEmpty()
    @ApiModelProperty({ required: true,})
    firstName: string;

    @ApiModelProperty()
    lastName?: string;

    @IsNotEmpty()
    @ApiModelProperty({ required: true})
    password:string;

    @IsNotEmpty()
    @ApiModelProperty({ required: true})
    phonenumber:string;

    @IsNotEmpty()
    @ApiModelProperty({ required: true})
    username:string;

    @IsNotEmpty()
    @ApiModelProperty({ required: true})
    businessId:string;
    
    @IsNotEmpty()
    @ApiModelProperty({ required: true})
    roleId:string;

    @ApiModelProperty({ required: true})
    businesslocationids:[string]
  
}