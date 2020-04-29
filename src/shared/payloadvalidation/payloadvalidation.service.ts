import { Injectable, HttpStatus } from '@nestjs/common';

import { IValidator, Validator, ValidationResult } from 'ts.validator.fluent/dist';
import { SigupDto } from '../../app-Dto/usermgr/signup.dto';
import { LoginDto } from '../../auth/auth.dto';
import { ResponseObj } from '../generic.response';
import { promises } from 'dns';
import { CreatCategoryDto, CreatSubCategoryDto } from '../../app-Dto/category.dto';

@Injectable()
export class PayloadvalidationService {
    constructor() {}
    async badRequestErrorMessage(validationResult:any):Promise <ResponseObj<any>>{

        let allErrors = validationResult.Errors.map(function(a) {
            return   {Message:a.Message,Identifier:a.Identifier};
        });
        let result= new ResponseObj<any>();
        result.message=`A validation error occured please correct all arror` ;
        result.status=false;
        result.result=allErrors;
        result.code=400;
        return result 
    }

    async validateSignUpAsync(model: SigupDto): Promise < ValidationResult >
    {    
        return await new Validator(model).ValidateAsync(this.validateSignUpRules); 

    }
    async validateSignInAsync(model: LoginDto): Promise < ValidationResult >
    {    
        return await new Validator(model).ValidateAsync(this.validateSignInRules); 

    }        
    validateSignUpRules =  (validator: IValidator<SigupDto>) : ValidationResult => {
        return validator
        .If(m => m.contactPerson.email != '', validator =>  validator.Email(m => m.contactPerson.email, "Should not be invalid", "RegistrationDto.email.Invalid").ToResult())  
       
        .NotEmpty(m => m.contactPerson.firstName, "Should not be empty", "SigupDto.firstName.Empty")
        .NotEmpty(m => m.contactPerson.lastName, "Should not be empty", "SigupDto.lastName.Empty")
        .NotEmpty(m => m.contactPerson.phonenumber, "Should not be empty", "SigupDto.phonenumber.Empty")
        .NotEmpty(m => m.contactPerson.password, "Should not be empty", "SigupDto.password.Empty")
        .NotEmpty(m => m.contactPerson.email, "Should not be empty", "SigupDto.email.Empty")
        .NotEmpty(m => m.company.comapanyName, "Should not be empty", "company.comapanyName.Empty")
        .NotEmpty(m => m.company.address, "Should not be empty", "company.address.Empty")
        .ToResult();
    };
    validateSignInRules =  (validator: IValidator<LoginDto>) : ValidationResult => {
        return validator
        .If(m => m.email != '', validator =>  validator.Email(m => m.email, "invalid username ", "LoginDto.email.Invalid").ToResult())  
        .NotEmpty(m => m.password, "Should not be empty", "LoginDto.password.Empty")
        .ToResult();
    };
    async validateCatgoryAsync(model: CreatCategoryDto): Promise < ValidationResult >
    {    
        return await new Validator(model).ValidateAsync(this.validateCatgoryRules); 

    }
    validateCatgoryRules =  (validator: IValidator<CreatCategoryDto>) : ValidationResult => {
        return validator.NotEmpty(m => m.name, "Should not be empty", "Category.name.Empty")
               .ToResult();
    };
    async validateSubCatgoryAsync(model: CreatSubCategoryDto): Promise < ValidationResult >
    {    
        return await new Validator(model).ValidateAsync(this.validateSubCatgoryRules); 

    }
    validateSubCatgoryRules =  (validator: IValidator<CreatSubCategoryDto>) : ValidationResult => {
        return validator
        .NotEmpty(m => m.name, "Should not be empty", "CreatSubCategoryDto.name.Empty")
        .NotEmpty(m => m.categoryId, "Should not be empty", "CreatSubCategoryDto.categoryId.Empty")
               .ToResult();
    };
   
}
