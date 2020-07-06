
import { CreateCompanyDto, CreateBusinessLocationDto } from "./company/company.dto";
import { CreateUserDto } from "../../users/user.dto";
import { ApiModelProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";


export class SigupDto {

    @ApiModelProperty({ type: CreateCompanyDto })
    @Type(() => CreateCompanyDto)
    company: CreateCompanyDto;
   
    @ApiModelProperty({ type: CreateUserDto })
    @Type(() => CreateUserDto)
    contactPerson: CreateUserDto;

    @ApiModelProperty({ type: CreateBusinessLocationDto })
    @Type(() => CreateBusinessLocationDto)
    businesslocation: CreateBusinessLocationDto;

    

}
export class CreateNonAdminUser {


    @ApiModelProperty({ required: true })
    email: string;
    @ApiModelProperty({ required: true, })
    firstName: string;
    @ApiModelProperty()
    lastName?: string;
    @ApiModelProperty({ required: true })
    password: string;
    @ApiModelProperty({ required: true })
    phonenumber: string;
    @ApiModelProperty({ required: true })
    username: string;
    @ApiModelProperty({ required: true })
    businessId: string;
    @ApiModelProperty({ required: true })
    roleId: string;
    @ApiModelProperty({ required: true })
    businesslocationids: string

}