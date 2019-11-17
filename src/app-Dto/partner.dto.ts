import { IsNotEmpty, IsInt, Min, Max, IsEmail, Length, IsBoolean, MaxLength } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

export class CreatCustomerDto{

    @IsNotEmpty()
    @ApiModelProperty({ required: true, example: 'Anthony Parcker' })
    @MaxLength(100)
    fullname:string;

    @IsNotEmpty()
    @ApiModelProperty({ required: true})
    mobilenumber:string;

    @IsNotEmpty()
    @IsEmail()
    @ApiModelProperty({ required: true})
    email:string;

     @IsInt()
    gender:number;

    @IsInt()
    @Min(1,{ message: "age is too short"})
    age:number;

    @Min(1,{ message: "birthday is too short"})
    @Max(31)
    @IsInt()
    birthday:number;
    
    @IsNotEmpty()
    @ApiModelProperty({ required: true})
    birthmonth:string;
    
}
export class UpdateCustomerDto{

    @IsNotEmpty()
    @ApiModelProperty({ required: true, example: 'a29q126f-1c37-4c1f-8771-83334526fed8e' })
    @MaxLength(100)
    id:string;

    @IsNotEmpty()
    @ApiModelProperty({ required: true, example: 'Anthony Parcker' })
    @MaxLength(100)
    fullname:string;

    @IsNotEmpty()
    @ApiModelProperty({ required: true, example: 'a29q126f-1c37-4c1f-8771-83334526fed8e' })
    businessid: string;

    @IsNotEmpty()
    @ApiModelProperty({ required: true})
    mobilenumber:string;

    @IsNotEmpty()
    @IsEmail()
    @ApiModelProperty({ required: true})
    email:string;

    @IsInt()
    gender:number;

    @IsInt()
    @Min(1,{ message: "age is too short"})
    age:number;

    @Min(1,{ message: "birthday is too short"})
    @Max(31)
    @IsInt()
    birthday:number;
    
    @IsNotEmpty()
    @ApiModelProperty({ required: true})
    birthmonth:string;
    
}
export class CreatSupplierDto{

    @IsNotEmpty()
    @ApiModelProperty({ required: true, example: 'Anthony Parcker ltd' })
    @MaxLength(100)
    company:string;

    @IsNotEmpty()
    @ApiModelProperty({ required: true})
    @MaxLength(13)
    mobilenumber:string;

    @IsNotEmpty()
    @IsEmail()
    @ApiModelProperty({ required: true})
    @MaxLength(50)
    email:string;

    @IsNotEmpty()
    @ApiModelProperty({ required: true, example: 'Anthony Parcker ltd' })
    @MaxLength(100)
    address:string;
    
}