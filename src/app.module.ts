import { Module} from '@nestjs/common';
import{ValidationPipe} from './shared/validation.pipe'
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import { RolesModule } from './roles/roles.module';
import { CompanyModule } from './company/company.module';
import { AccountModule } from './account/account.module';

import { APP_PIPE } from '@nestjs/core';
import { HandlebarsAdapter, MailerModule } from '@nest-modules/mailer';
import { EmailModule } from './shared/email/email.module';
import { rootPath } from 'electron-root-path';
import { BusinesslocationModule } from './businesslocation/businesslocation.module';

import { RoutesModule } from './settings/routes/routes.module';
import { FeaturesModule } from './settings/features/features.module';
import { CategorysController } from './categorys/categorys.controller';
import { CategorysModule } from './categorys/categorys.module';
import { PartnersController } from './partners/partners.controller';
import { PartnersModule } from './partners/partners.module';
import * as path from 'path';
import { from } from 'rxjs';
import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';
import { ProductModule } from './product/product.module';
import { RolesController } from './roles/roles.controller';
import { FeaturesController } from './settings/features/features.controller';
import { UsersController } from './users/users.controller';
import { CompanyController } from './company/company.controller';


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
       
    ],
    controllers: [AppController, CategorysController, CompanyController,PartnersController, ProductController,RolesController,FeaturesController,UsersController],
    providers: [{provide: APP_PIPE, useClass: ValidationPipe, }]
})

export class ApplicationModule {
    constructor() { }
}
