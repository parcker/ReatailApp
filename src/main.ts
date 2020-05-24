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
import { ValidationPipe } from '@nestjs/common';

//@nestjs/common


async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(ApplicationModule, { logger: ['error', 'log', 'warn'] });
    app.enableCors();
    app.use(logger(process.env.NODE_ENV));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.useGlobalFilters(new EntitiesExceptionFilter());

    initDocumentation(app, {
        version: '0.0.1',
        description: 'Nest boilerplate description.',
        title: 'Nest boilerplate',
        endpoint: '/docs'
    });
    //app.useGlobalPipes(new ValidationPipe());
    await app.listen(parseInt(process.env.PORT) || 8003);
}

bootstrap();
