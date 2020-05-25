import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Category, SubCategory } from '../../entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Business } from '../../entities/business.entity';
import { ResponseObj } from '../../shared/generic.response';
import { PayloadvalidationService } from '../../shared/payloadvalidation/payloadvalidation.service';
import { ApiResponseService } from '../../shared/response/apiResponse.service';
import { Product } from '../../entities/product.entity';

@Injectable()
export class CategorysService {


    constructor(@InjectRepository(Category) private readonly categorRepository: Repository<Category>,
        @InjectRepository(SubCategory) private readonly subcategoryRepository: Repository<SubCategory>,
        @InjectRepository(Business) private readonly businessRepository: Repository<Business>,
        @InjectRepository(Product) private readonly productRepository: Repository<Product>,
        private readonly payloadService: PayloadvalidationService,
        private readonly apiResponseService: ApiResponseService) { }
    async createCategory(categoryname: string, createdby: string, business: Business): Promise<any> {
        try {
            let validationResult = await this.payloadService.validateCatgoryAsync({ name: categoryname });
            if (validationResult.IsValid) {

                let checkduplicate = await this.categorRepository.findOne({ where: { name: categoryname } });
                if (checkduplicate) {

                    return this.apiResponseService.FailedBadRequestResponse(
                        `duplicate category name found ${categoryname}`,
                        HttpStatus.BAD_REQUEST, '');

                }
                const model = new Category();
                model.business = business;
                model.name = categoryname.trim();
                model.createdby = createdby;
                model.updatedby = '',
                    model.isDisabled = false
                const dbresponse = await this.categorRepository.save(model);
                return this.apiResponseService.SuccessResponse(
                    `${dbresponse.name} has been created and activated`,
                    HttpStatus.OK, dbresponse);

            }
            return await this.payloadService.badRequestErrorMessage(validationResult);

        }
        catch (error) {
            console.log('Error Message', error, Date.now())
            Logger.error(error);
            return new
                HttpException({
                    message: 'Process error while executing operation:',
                    code: 500, status: false
                },
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteCategory(categoryId: string, createdby: string, businessId: string): Promise<any> {

        try {
            const dbcategory = await this.categorRepository.findOne({ where: { id: categoryId.trim(), business: { id: businessId }, isDisabled: false } });
            if (!dbcategory) {
                return this.apiResponseService.FailedBadRequestResponse(
                    `No category match found`,
                    HttpStatus.BAD_REQUEST, '');

            }
            ////TODO check if attched to products 

            dbcategory.isDisabled = true;
            dbcategory.updatedby = createdby
            const dbresponse = await this.categorRepository.save(dbcategory);
            return this.apiResponseService.SuccessResponse(
                `${dbresponse.name} has been diabled`,
                HttpStatus.OK, dbresponse);

        }
        catch (error) {
            console.log('Error Message', error, Date.now())
            return new
                HttpException({
                    message: 'Process error while executing operation:',
                    code: 500, status: false
                },
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    async updateCategory(categoryId: string, categoryname: string, updatedby: string, business: Business): Promise<any> {

        try {

            let validationResult = await this.payloadService.validateCatgoryAsync({ name: categoryname });
            if (validationResult.IsValid) {


                const dbcategory = await this.categorRepository.findOne({ where: { id: categoryId.trim(), business: { id: business.id }, isDisabled: false } });
                if (!dbcategory) {

                    return this.apiResponseService.FailedBadRequestResponse(
                        `No category match found`,
                        HttpStatus.BAD_REQUEST, '');
                }
                dbcategory.name = categoryname.trim();
                dbcategory.updatedby = updatedby;
                const dbresponse = await this.categorRepository.save(dbcategory);

                return this.apiResponseService.SuccessResponse(
                    `${dbresponse.name} has been updated`,
                    HttpStatus.OK, dbresponse);

            }
            return await this.payloadService.badRequestErrorMessage(validationResult);

        }
        catch (error) {
            console.log('Error Message', error, Date.now())
            Logger.error(error);
            return new
                HttpException({
                    message: 'Process error while executing operation:',
                    code: 500, status: false
                },
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    async getcategory(business: Business): Promise<any> {
        try {

            const [dbcategory, count] = await this.categorRepository.findAndCount({ where: { business: business, isDisabled: false }, relations: ["subcategory"] });
            return this.apiResponseService.SuccessResponse(
                `Total of ${count} category found `,
                HttpStatus.OK, dbcategory);

        }
        catch (error) {
            console.log('Error Message', error, Date.now())
            return new
                HttpException({
                    message: 'Process error while executing operation:',
                    code: 500, status: false
                },
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async createSubCategory(subname: string, categoryId: string, createdby: string, business: Business): Promise<any> {
        try {

            let getcategoryInfo = await this.categorRepository.findOne({ where: { id: categoryId, isDisabled: false } });
            if (!getcategoryInfo) {

                return this.apiResponseService.FailedBadRequestResponse(
                    `invalid or category  Id , no category  data found`,
                    HttpStatus.BAD_REQUEST, '');
            }
            if (await this.subcategoryRepository.findOne({ where: 
                { name: subname.trim().toLocaleLowerCase(), 
                    category: getcategoryInfo, 
                    businesslocation: business, isDisabled: false } })) {

                return this.apiResponseService.FailedBadRequestResponse(
                    `duplicate sub-category name found ${subname}`,
                    HttpStatus.BAD_REQUEST, '');

            }

            const model = new SubCategory();
            model.business = business;
            model.name = subname.trim().toLocaleLowerCase();
            model.createdby = createdby;
            model.category = getcategoryInfo;
            model.updatedby = '',
                model.isDisabled = false

            const dbresponse = await this.subcategoryRepository.save(model);
            return this.apiResponseService.SuccessResponse(
                `${dbresponse.name} has been created and activated`,
                HttpStatus.OK, dbresponse);

        }
        catch (error) {
            console.log('Error Message', error, Date.now())
            return new
                HttpException({
                    message: 'Process error while executing operation:',
                    code: 500, status: false
                },
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteSubCategory(Id: string, actionby: string, businessId: string): Promise<any> {

        try {
            const dbsubcategory = await this.subcategoryRepository.findOne({ where: { id: Id.trim(), business: { id: businessId }, isDisabled: false } });
            if (!dbsubcategory) {
                return this.apiResponseService.FailedBadRequestResponse(
                    `No Subcategory match found`,
                    HttpStatus.BAD_REQUEST, '');

            }
            ////TODO check if attched to products 
            const productassociate = await this.productRepository.count({ subCategory: dbsubcategory })
            if (productassociate > 0) {

                return this.apiResponseService.FailedBadRequestResponse(
                    `delete failed ${productassociate} is found attched to this subcategory`,
                    HttpStatus.BAD_REQUEST, '');
            }

            dbsubcategory.isDisabled = true;
            dbsubcategory.updatedby = actionby
            const dbresponse = await this.subcategoryRepository.save(dbsubcategory);
            return this.apiResponseService.SuccessResponse(
                `${dbresponse.name} has been created and disabled`,
                HttpStatus.OK, dbresponse);

        }
        catch (error) {
            console.log('Error Message', error, Date.now())
            return new
                HttpException({
                    message: 'Process error while executing operation:',
                    code: 500, status: false
                },
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    async updateSubCategory(Id: string, subcategoryname: string, updatedby: string, business: Business, categoryId: string): Promise<any> {

        try {

            let validationResult = await this.payloadService.validateSubCatgoryAsync(
                { name: subcategoryname, categoryId: categoryId }
            );
            if (validationResult.IsValid) {
               
                let dbSubcategory = await this.subcategoryRepository.findOne({ where: { id: Id.trim(), business: business, isDisabled: false } });
                if (!dbSubcategory) {
                    return this.apiResponseService.FailedBadRequestResponse(
                        `No Subcategory match found`,
                        HttpStatus.BAD_REQUEST, '');
                   
                }
                let oldername = dbSubcategory.name;

                let category = await this.categorRepository.findOne({ where: { id: categoryId } });
                if (!category) {

                    return this.apiResponseService.FailedBadRequestResponse(
                        `No category match found with id ${categoryId}`,
                        HttpStatus.BAD_REQUEST, '');
                }


                dbSubcategory.category = category;
                dbSubcategory.name = subcategoryname.trim();
                dbSubcategory.updatedby = updatedby;

                let dbresponse = await this.categorRepository.save(dbSubcategory);
                return this.apiResponseService.SuccessResponse(
                    `${oldername} has been updated to ${dbresponse.name}`,
                    HttpStatus.OK, dbresponse);
                
            }
            return await this.payloadService.badRequestErrorMessage(validationResult);
        }
        catch (error) {
            console.log('Error Message', error, Date.now())
            return new
                HttpException({
                    message: 'Process error while executing operation:',
                    code: 500, status: false
                },
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}
