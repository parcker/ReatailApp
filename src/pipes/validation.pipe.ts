import {
    PipeTransform,
    Injectable,
    ArgumentMetadata,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';

  
  import { validate } from 'class-validator';
  import { plainToClass } from 'class-transformer';
import { PayloadvalidationService } from '../shared/payloadvalidation/payloadvalidation.service';
import { ResponseObj } from '../shared/generic.response';
  
  @Injectable()
  export class ValidationPipe implements PipeTransform<any> {
    
    async transform(value: any, metadata: ArgumentMetadata) {
      if (value instanceof Object && this.isEmpty(value)) {
        throw new HttpException(
          `Validation failed: No Body provided`,
          HttpStatus.BAD_REQUEST,
        );
      }
      const { metatype } = metadata;
      if (!metatype || !this.toValidate(metatype)) {
        return value;
      }
      const object = plainToClass(metatype, value);
      const errorsList = await validate(object);
      if (errorsList.length > 0)
      {
            const errors = [];
            for (const error of errorsList) 
            {
                const errorsObject = error.children;
                if(errorsObject.length>0)
                {
                        for(const error of errorsObject)
                        {
                        
                            if(error.children.length>0)
                            {
                                    const level2= error.children;
                                                        
                                    for(const error of level2)
                                    {
                                        errors.push({
                                                Identifier: `${error.property}`,
                                                Message: `${ Object.values(error.constraints)[0]}`,
                                                });
                                        
                                    }
                            }
                            
                        }
                }
                else{
                    
                    errors.push({
                        Identifier: `${error.property}`,
                        Message: `${ Object.values(error.constraints)[0]}`,
                        });
                }
            }

            if (errors.length > 0) 
            {
                let result = new ResponseObj<any>();
                result.message = `A validation error occured please correct all arror`;
                result.status = false;
                result.result = errors;
                result.code = HttpStatus.BAD_REQUEST;
                throw new HttpException({ result }, HttpStatus.BAD_REQUEST);
            }
      }
      return value;
    }
   
    private toValidate(metatype): boolean {
      const types = [String, Boolean, Number, Array, Object];
      return !types.find(type => metatype === type);
    }
    private isEmpty(value: any) {
      if (Object.keys(value).length > 0) {
        return false;
      }
      return true;
    }
  }