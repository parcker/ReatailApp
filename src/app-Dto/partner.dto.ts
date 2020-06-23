
import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";

export class CreatCustomerDto {
    @ApiModelProperty({ required: true, example: 'Anthony Parcker' })
    fullname: string;
    @ApiModelProperty({ required: true })
    mobilenumber: string;
    @ApiModelPropertyOptional()
    email: string;
    @ApiModelPropertyOptional()
    gender: number;
    @ApiModelPropertyOptional()
    age: number;
    @ApiModelPropertyOptional()
    birthday: number;
    @ApiModelPropertyOptional()
    birthmonth: string;

}
export class UpdateCustomerDto {


    @ApiModelProperty({ required: true, example: 'Anthony Parcker' })
    fullname: string;
    @ApiModelProperty({ required: true })
    mobilenumber: string;
    @ApiModelPropertyOptional()
    email: string;
    @ApiModelPropertyOptional()
    gender: number;
    @ApiModelPropertyOptional()
    age: number;
    @ApiModelPropertyOptional()
    birthday: number;
    @ApiModelPropertyOptional()
    birthmonth: string;

}
export class CreatSupplierDto {

    @ApiModelProperty({ required: true, example: 'Anthony Parcker ltd' })
    company: string;
    @ApiModelProperty({ required: true })
    mobilenumber: string;
    @ApiModelPropertyOptional()
    email: string;
    @ApiModelProperty({ required: true, example: 'Anthony Parcker ltd' })
    address: string;
    @ApiModelPropertyOptional()
    website: string;
    @ApiModelProperty({ required: true, example: 'Anthony' })
    contactpersonname: string;
    @ApiModelProperty({ required: true})
    contactpersonphonenumber: string;
    @ApiModelProperty({ required: true})
    contactpersonemail: string;
    @ApiModelPropertyOptional()
    street: string;
    @ApiModelPropertyOptional()
    stateId: string;
    @ApiModelPropertyOptional()
    facebooklink: string;
    @ApiModelPropertyOptional()
    instagramlink: string;
    @ApiModelPropertyOptional()
    twitterlink: string;
    @ApiModelPropertyOptional()
    accountId: string;
    
}