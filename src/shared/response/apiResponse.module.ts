import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiResponseService } from './apiResponse.service';

@Module({

    imports: [ ],
      providers: [ApiResponseService],
      exports:[ApiResponseService]

})
export class ApiResponseModule {

}
