import {IsNotEmpty} from "class-validator";
import { CreateCompanyDto } from "./company/company.dto";
import { CreateUserDto } from "../../users/user.dto";
import { ApiModelProperty } from "@nestjs/swagger";
export class SigupDto{

    @ApiModelProperty({ type: CreateCompanyDto })
    company:CreateCompanyDto;
    @ApiModelProperty({ type: CreateUserDto })
    contactPerson:CreateUserDto;

}