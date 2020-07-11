
import { CreateCompanyDto, CreateBusinessLocationDto } from "./company/company.dto";
import { CreateUserDto } from "./user.dto";
import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";
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
export class MerchantUserDto {


  
    @ApiModelProperty({ required: true, })
    firstName: string;
    @ApiModelPropertyOptional()
    lastName?: string;
    @ApiModelProperty({ required: true })
    phonenumber: string;
    @ApiModelProperty({ required: true })
    password: string;
    @ApiModelProperty({ required: true })
    confirmpassword: string;
    @ApiModelProperty({ required: true, })
    token: string;
   

}