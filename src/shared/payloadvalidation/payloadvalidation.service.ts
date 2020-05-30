import { Injectable, HttpStatus } from '@nestjs/common';

import { IValidator, Validator, ValidationResult } from 'ts.validator.fluent/dist';
import { SigupDto } from '../../app-Dto/usermgr/signup.dto';
import { LoginDto } from '../../auth/auth.dto';
import { ResponseObj } from '../generic.response';
import { promises } from 'dns';
import { CreatCategoryDto, CreatSubCategoryDto } from '../../app-Dto/category.dto';
import { CreatProductDto } from '../../app-Dto/product.dto';
import { CreatCustomerDto, UpdateCustomerDto, CreatSupplierDto } from '../../app-Dto/partner.dto';

@Injectable()
export class PayloadvalidationService {

    constructor() { }
    async badRequestErrorMessage(validationResult: any): Promise<ResponseObj<any>> {

        let allErrors = validationResult.Errors.map(function (a) {
            return {
                Message: a.Message,
                Identifier: a.Identifier
            };
        });
        let result = new ResponseObj<any>();
        result.message = `A validation error occured please correct all arror`;
        result.status = false;
        result.result = allErrors;
        result.code = HttpStatus.BAD_REQUEST;
        return result
    }


    async validateSignUpAsync(model: SigupDto): Promise<ValidationResult> {
        return await new Validator(model).ValidateAsync(this.validateSignUpRules);

    }
    async validateSignInAsync(model: LoginDto): Promise<ValidationResult> {
        return await new Validator(model).ValidateAsync(this.validateSignInRules);

    }
    validateSignUpRules = (validator: IValidator<SigupDto>): ValidationResult => {
        return validator
            .If(m => m.contactPerson.email != '', validator => validator.Email(m => m.contactPerson.email, "Should not be invalid", "RegistrationDto.email.Invalid").ToResult())

            .NotEmpty(m => m.contactPerson.firstName, "Should not be empty", "SigupDto.firstName.Empty")
            .NotEmpty(m => m.contactPerson.lastName, "Should not be empty", "SigupDto.lastName.Empty")
            .NotEmpty(m => m.contactPerson.phonenumber, "Should not be empty", "SigupDto.phonenumber.Empty")
            .NotEmpty(m => m.contactPerson.password, "Should not be empty", "SigupDto.password.Empty")
            .NotEmpty(m => m.contactPerson.email, "Should not be empty", "SigupDto.email.Empty")
            .NotEmpty(m => m.company.comapanyName, "Should not be empty", "company.comapanyName.Empty")
            .NotEmpty(m => m.company.address, "Should not be empty", "company.address.Empty")
            .ToResult();
    };
    validateSignInRules = (validator: IValidator<LoginDto>): ValidationResult => {
        return validator
            .If(m => m.email != '', validator => validator.Email(m => m.email, "invalid username ", "LoginDto.email.Invalid").ToResult())
            .NotEmpty(m => m.password, "Should not be empty", "LoginDto.password.Empty")
            .ToResult();
    };
    async validateCatgoryAsync(model: CreatCategoryDto): Promise<ValidationResult> {
        return await new Validator(model).ValidateAsync(this.validateCatgoryRules);

    }
    validateCatgoryRules = (validator: IValidator<CreatCategoryDto>): ValidationResult => {
        return validator.NotEmpty(m => m.name, "Should not be empty", "Category.name.Empty")
            .ToResult();
    };
    async validateSubCatgoryAsync(model: CreatSubCategoryDto): Promise<ValidationResult> {
        return await new Validator(model).ValidateAsync(this.validateSubCatgoryRules);

    }
    validateSubCatgoryRules = (validator: IValidator<CreatSubCategoryDto>): ValidationResult => {
        return validator
            .NotEmpty(m => m.name, "Should not be empty", "CreatSubCategoryDto.name.Empty")
            .NotEmpty(m => m.categoryId, "Should not be empty", "CreatSubCategoryDto.categoryId.Empty")
            .ToResult();
    };
    async validateProductAsync(model: CreatProductDto): Promise<ValidationResult> {
        return await new Validator(model).ValidateAsync(this.validateProductRules);

    };
    validateProductRules = (validator: IValidator<CreatProductDto>): ValidationResult => {
        return validator
            .NotEmpty(m => m.name, "Should not be empty", "CreatProductDto.name.Empty")
            .NotEmpty(m => m.itemcode, "Should not be empty", "CreatProductDto.itemcode.Empty")
            .NotEmpty(m => m.categoryId, "Should not be empty", "CreatProductDto.categoryId.Empty")
            .If(m => m.subcategoryId != '', validator => 
            validator.IsGuid(m => m.subcategoryId, "Should not be invalid", "CreatProductDto.subcategoryId.Invalid").ToResult())
            .ToResult();
    };
    async validateCustomerAsync(model: CreatCustomerDto): Promise<ValidationResult> {
        return await new Validator(model).ValidateAsync(this.validateCustomerRules);

    };
    validateCustomerRules = (validator: IValidator<CreatCustomerDto>): ValidationResult => {
        return validator                              
        .NotEmpty(m => m.fullname, "Should not be empty", "CreatCustomerDto.fullname.Empty")
        .NotNull(m => m.fullname, "Should not be null", "fullname.Null")
        .NotEmpty(m => m.mobilenumber, "Should not be empty", "CreatCustomerDto.mobilenumber.Empty")
        .NotNull(m => m.mobilenumber, "Should not be null", "mobilenumber.Null")
        .ToResult();                                                                                                                    

    };
    async validateSupplierAsync(model: CreatSupplierDto): Promise<ValidationResult> {
        return await new Validator(model).ValidateAsync(this.validateSupplierRules);

    };
    validateSupplierRules = (validator: IValidator<CreatSupplierDto>): ValidationResult => {
        return validator                              
        .NotEmpty(m => m.company, "Should not be empty", "CreatSupplierDto.company.Empty")
        .NotNull(m => m.company, "Should not be null", "company.Null")
        .NotEmpty(m => m.mobilenumber, "Should not be empty", "CreatSupplierDto.mobilenumber.Empty")
        .NotNull(m => m.mobilenumber, "Should not be null", "mobilenumber.Null")
        .NotEmpty(m => m.address, "Should not be empty", "CreatSupplierDto.address.Empty")
        .NotNull(m => m.address, "Should not be null", "address.Null")
     
        .ToResult();                                                                                                                    

    };
   
   
}
