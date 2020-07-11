import { Injectable, HttpStatus } from '@nestjs/common';

import { IValidator, Validator, ValidationResult } from 'ts.validator.fluent/dist';
import { SigupDto, MerchantUserDto } from '../../app-Dto/usermgr/signup.dto';
import { LoginDto } from '../../auth/auth.dto';
import { ResponseObj } from '../generic.response';
import { promises } from 'dns';
import { CreatCategoryDto, CreatSubCategoryDto } from '../../app-Dto/merchant/category.dto';
import { CreatProductDto, UpdateProductDto } from '../../app-Dto/merchant/product.dto';
import { CreatCustomerDto, UpdateCustomerDto, CreatSupplierDto } from '../../app-Dto/merchant/partner.dto';
import { CreatePurchaseOrderHeaderDto } from '../../app-Dto/merchant/purcahseorder.dto';
import { CreateUserDto } from '../../app-Dto/usermgr/user.dto';

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


    async validateBusinessSignUpAsync(model: SigupDto): Promise<ValidationResult> {
        return await new Validator(model).ValidateAsync(this.validateBusinessSignUpRules);

    }
    async validateSignInAsync(model: LoginDto): Promise<ValidationResult> {
        return await new Validator(model).ValidateAsync(this.validateSignInRules);

    }
    validateBusinessSignUpRules = (validator: IValidator<SigupDto>): ValidationResult => {
        return validator
            .If(m => m.contactPerson.email != '', validator => validator.Email(m => m.contactPerson.email, "Should not be invalid", "RegistrationDto.email.Invalid").ToResult())

            .NotEmpty(m => m.contactPerson.firstName, "Should not be empty", "SigupDto.firstName.Empty")
            .NotEmpty(m => m.contactPerson.lastName, "Should not be empty", "SigupDto.lastName.Empty")
            .NotEmpty(m => m.contactPerson.phonenumber, "Should not be empty", "SigupDto.phonenumber.Empty")
            .NotEmpty(m => m.contactPerson.password, "Should not be empty", "SigupDto.password.Empty")
            .NotEmpty(m => m.contactPerson.email, "Should not be empty", "SigupDto.email.Empty")
            .NotEmpty(m => m.company.comapanyName, "Should not be empty", "company.comapanyName.Empty")
            .NotEmpty(m => m.company.address, "Should not be empty", "company.address.Empty")
            .NotEmpty(m => m.businesslocation.name, "Should not be empty", "businesslocation.name.Empty")
            .NotEmpty(m => m.businesslocation.address, "Should not be empty", "businesslocation.address.Empty")
            .NotEmpty(m => m.company.address, "Should not be empty", "company.address.Empty")
            .If(m => m.contactPerson.password != '', validator => validator
                .ForStringProperty(m => m.contactPerson.password, passwordValidator => passwordValidator
                    .Matches("(?=.*?[0-9])(?=.*?[a-z])(?=.*?[A-Z])", "Password strength is not valid", "contactPerson.Password.Strength")
                    .Required((m, pwd) => pwd.length > 6, "Password length should be greater than 6", "contactPerson.Password.Length")

                    .ToResult())
                .ToResult())
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
            //.IsNumberEqual(m => m.productconfiguration.packingQty, "Should not be empty", "CreatProductDto.categoryId.Empty")
            .If(m => m.subcategoryId != '', validator =>
                validator.IsGuid(m => m.subcategoryId, "Should not be invalid", "CreatProductDto.subcategoryId.Invalid").ToResult())
            .ToResult();
    };
    async validateProductUpdateAsync(model: UpdateProductDto): Promise<ValidationResult> {
        return await new Validator(model).ValidateAsync(this.validateProductUpdateRules);

    };
    validateProductUpdateRules = (validator: IValidator<UpdateProductDto>): ValidationResult => {
        return validator
            .NotEmpty(m => m.name, "Should not be empty", "CreatProductDto.name.Empty")
            .NotEmpty(m => m.itemcode, "Should not be empty", "CreatProductDto.itemcode.Empty")
            .NotEmpty(m => m.categoryId, "Should not be empty", "CreatProductDto.categoryId.Empty")
            .If(m => m.subcategoryId !== null, validator =>
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
            .NotEmpty(m => m.mobilenumber, "Should not be empty", "CreatSupplierDto.mobilenumber.Empty")
            .NotEmpty(m => m.address, "Should not be empty", "CreatSupplierDto.address.Empty")
            .NotEmpty(m => m.contactpersonemail, "Should not be empty", "CreatSupplierDto.contactpersonemail.Empty")
            .NotEmpty(m => m.contactpersonname, "Should not be empty", "CreatSupplierDto.contactpersonname.Empty")
            .NotEmpty(m => m.contactpersonphonenumber, "Should not be empty", "CreatSupplierDto.contactpersonphonenumber.Empty")
            .If(m => m.email != '', validator =>
                validator.Email(m => m.email, "Should not be invalid", "CreatSupplierDto.email.Invalid").ToResult())
            .If(m => m.contactpersonemail != '', validator =>
                validator.Email(m => m.contactpersonemail, "Should not be invalid", "CreatSupplierDto.contactpersonemail.Invalid").ToResult())
            .If(m => m.website != '', validator =>
                validator.IsUrl(m => m.website, "Should not be invalid", "CreatSupplierDto.website.Invalid").ToResult())
            .ToResult();

    };
    async validateLoginAsync(model: LoginDto): Promise<ValidationResult> {
        return await new Validator(model).ValidateAsync(this.validateLoginRules);

    };
    validateLoginRules = (validator: IValidator<LoginDto>): ValidationResult => {
        return validator
            .NotEmpty(m => m.email, "Should not be empty", "LoginDto.email.Empty")
            .NotNull(m => m.email, "Should not be null", "email.Null")
            .NotEmpty(m => m.password, "Should not be empty", "LoginDto.password.Empty")
            .NotNull(m => m.password, "Should not be null", "password.Null")
            .ToResult();

    };
    async validatePurchaseOrderHeaderAsync(model: CreatePurchaseOrderHeaderDto): Promise<ValidationResult> {
        return await new Validator(model).ValidateAsync(this.validatePurchaseOrderHeaderRules);

    };
    validatePurchaseOrderHeaderRules = (validator: IValidator<CreatePurchaseOrderHeaderDto>): ValidationResult => {
        return validator
            .NotEmpty(m => m.supplierId, "Should not be empty", "CreateOrderDto.supplierId.Empty")
            .NotNull(m => m.supplierId, "Should not be null", "CreateOrderDto.supplierId.Null")
            .NotEmpty(m => m.shiptobusinessId, "Should not be empty", "CreateOrderDto.shiptobusinessId.Empty")
            .NotNull(m => m.shiptobusinessId, "Should not be null", "CreateOrderDto.shiptobusinessId.Null")

            .ToResult();

    };

    async validateMerchantUserAsync(model: MerchantUserDto): Promise<ValidationResult> {
        return await new Validator(model).ValidateAsync(this.validateMerchantUserRules);

    };
    validateMerchantUserRules = (validator: IValidator<MerchantUserDto>): ValidationResult => {
        return validator
            
            .NotEmpty(m => m.confirmpassword, "Should not be empty", "MerchantUserDto.confirmpassword.Empty")
            .NotEmpty(m => m.token, "Should not be empty", "MerchantUserDto.token.Empty")
            .NotEmpty(m => m.firstName, "Should not be empty", "MerchantUserDto.firstName.Empty")
            .NotEmpty(m => m.phonenumber, "Should not be empty", "MerchantUserDto.phonenumber.Empty")
            .NotEmpty(m => m.password, "Should not be empty", "MerchantUserDto.phonenumber.Empty")
            .If(m => m.password != '', validator => validator
                .ForStringProperty(m => m.password, passwordValidator => passwordValidator
                    .Matches("(?=.*?[0-9])(?=.*?[a-z])(?=.*?[A-Z])", "Password strength is not valid", "MerchantUserDto.Password.Strength")
                    .Required((m, pwd) => pwd.length > 6, "Password length should be greater than 6", "MerchantUserDto.Password.Length")
                    .Required((m, pwd) => pwd == m.confirmpassword, "Password and Confirm Password are not the same", "Password:ConfirmNotSame")   

                    .ToResult())
                .ToResult())
            .ToResult();

    };

    async validateSupperAdminUserSignUpAsync(model: CreateUserDto): Promise<ValidationResult> {
        return await new Validator(model).ValidateAsync(this.validateSupperAdminUserSignUpRules);

    };
    validateSupperAdminUserSignUpRules = (validator: IValidator<CreateUserDto>): ValidationResult => {
        return validator
            
            .NotEmpty(m => m.confirmpassword, "Should not be empty", "CreateUserDto.confirmpassword.Empty")
            .NotEmpty(m => m.lastName, "Should not be empty", "CreateUserDto.token.Empty")
            .NotEmpty(m => m.firstName, "Should not be empty", "CreateUserDto.firstName.Empty")
            .NotEmpty(m => m.phonenumber, "Should not be empty", "CreateUserDto.phonenumber.Empty")
            .NotEmpty(m => m.password, "Should not be empty", "CreateUserDto.phonenumber.Empty")
            .If(m => m.password != '', validator => validator
                .ForStringProperty(m => m.password, passwordValidator => passwordValidator
                    .Matches("(?=.*?[0-9])(?=.*?[a-z])(?=.*?[A-Z])", "Password strength is not valid", "CreateUserDto.Password.Strength")
                    .Required((m, pwd) => pwd.length > 6, "Password length should be greater than 6", "CreateUserDto.Password.Length")
                    .Required((m, pwd) => pwd == m.confirmpassword, "Password and Confirm Password are not the same", "Password:ConfirmNotSame")    
                    .ToResult())
                .ToResult())
            .ToResult();

    };


}
