import { Module} from '@nestjs/common';

import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import { RolesModule } from './roles/roles.module';
import { CompanyModule } from './company/company.module';
import { AccountModule } from './account/account.module';

import { HandlebarsAdapter, MailerModule } from '@nest-modules/mailer';
import { EmailModule } from './shared/email/email.module';
import { rootPath } from 'electron-root-path';
import { BusinesslocationModule } from './businesslocation/businesslocation.module';

import { RoutesModule } from './settings/routes/routes.module';
import { FeaturesModule } from './settings/features/features.module';
import { CategorysController } from './inventory/categorys/categorys.controller';
import { CategorysModule } from './inventory/categorys/categorys.module';
import { PartnersController } from './partners/partners.controller';
import { PartnersModule } from './partners/partners.module';
import * as path from 'path';
import { ProductController } from './inventory/product/product.controller';
import { ProductModule } from './inventory/product/product.module';
import { RolesController } from './roles/roles.controller';
import { FeaturesController } from './settings/features/features.controller';
import { UsersController } from './users/users.controller';
import { CompanyController } from './company/company.controller';
import { OrderModule } from './inventory/order/order.module';
import { PayloadvalidationModule } from './shared/payloadvalidation/payloadvalidation.module';

import {UtilityModule } from './shared/utilityservice/utility.module';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from './shared/ValidationPipe';
import { ApiResponseModule } from './shared/response/apiResponse.module';



@Module({
    imports: [
        TypeOrmModule.forRoot(),
        UsersModule,
        AuthModule,
        RolesModule,
        CompanyModule,
        AccountModule,
        
        MailerModule.forRootAsync({
            useFactory: () => ({
              transport: { host: 'smtp.mailtrap.io', port:  Number(process.env.EMAIL_PORT),
               auth: { user: process.env.EMAIL_USERNAME, pass: process.env.EMAIL_PASSWORD }},
              defaults: {
                from:'"nest-modules" <modules@nestjs.com>',
              },
              template: {
                dir: path.join(rootPath, '/templates/emails'),// __dirname + '/templates',
                adapter: new HandlebarsAdapter(), // or new PugAdapter()
                options: {
                  strict: true,
                },
              },
            }),
          }),
        EmailModule,
        BusinesslocationModule,
        RoutesModule,
        FeaturesModule,
        CategorysModule,
        PartnersModule,
        ProductModule,
        OrderModule,
        PayloadvalidationModule,
        UtilityModule,
        ApiResponseModule
       
    ],
    controllers: [AppController, CategorysController, CompanyController,PartnersController, ProductController,RolesController,FeaturesController,UsersController],
    providers: []//{provide: APP_PIPE, useClass: ValidationPipe }
})

export class ApplicationModule {
    constructor() { }
}
