import * as env from 'dotenv';
env.config();
import 'reflect-metadata';
import * as logger from 'morgan';


import * as bodyParser from 'body-parser';

import { NestExpressApplication } from '@nestjs/platform-express'
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { initDocumentation } from './documentation';
import { EntitiesExceptionFilter } from './http-exception.filter';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from './pipes/validation.pipe';

//@nestjs/common


async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(ApplicationModule, { logger: ['error', 'log', 'warn'] });
    app.enableCors();
    app.use(logger(process.env.NODE_ENV));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.useGlobalFilters(new EntitiesExceptionFilter());

    const options = new DocumentBuilder()
    .setTitle('Merchant example')
    .setDescription('The Merchant API description')
    .setVersion('1.0')
    .addTag('categorys')
    .addTag('product')
    .addTag('purchaseorder')
    .addTag('warehouse')
    .addTag('wholesale')
    .addTag('supplier')
    .addTag('customer')
    .addTag('settings')
    .addTag('merchantuseraccount')
    .addTag('account')
    .addTag('stocktransfer')
    .addTag('merchantpermission')
    .build();
     const document = SwaggerModule.createDocument(app, options);
     SwaggerModule.setup('api', app, document);
  
 
     //app.useGlobalPipes(new ValidationPipe());
    await app.listen(parseInt(process.env.PORT) || 8003);
    
}

bootstrap();
