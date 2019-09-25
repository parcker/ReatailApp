import {IsNotEmpty, ValidateNested} from "class-validator";
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