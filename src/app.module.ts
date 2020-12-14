import { Module} from '@nestjs/common';

import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

import { RolesModule } from './merchant/roles/roles.module';
import { CompanyModule } from './adminboard/company/company.module';
import { AccountModule } from './account/account.module';

import { HandlebarsAdapter, MailerModule } from '@nest-modules/mailer';
import { EmailModule } from './shared/email/email.module';
import { rootPath } from 'electron-root-path';
import { BusinesslocationModule } from './adminboard/businesslocation/businesslocation.module';

import { RoutesModule } from './adminboard/settings/routes/routes.module';
import { FeaturesModule } from './adminboard/settings/features/features.module';
import { CategorysController } from './merchant/inventory/categorys/categorys.controller';
import { CategorysModule } from './merchant/inventory/categorys/categorys.module';
import { CustomerController } from './merchant/partners/partners.controller';
import { PartnersModule } from './merchant/partners/partners.module';
import * as path from 'path';
import { ProductController } from './merchant/inventory/product/product.controller';
import { ProductModule } from './merchant/inventory/product/product.module';
import { RolesController } from './merchant/roles/roles.controller';
import { FeaturesController } from './adminboard/settings/features/features.controller';
import { CompanyController } from './adminboard/company/company.controller';

import { PayloadvalidationModule } from './shared/payloadvalidation/payloadvalidation.module';

import {UtilityModule } from './shared/utilityservice/utility.module';
import { ApiResponseModule } from './shared/response/apiResponse.module';
import { MerchantuseraccountModule } from './merchant/usermgr/merchantuseraccount.module';
import { SupplierController } from './merchant/partners/supplier.controller';
import { PurchaseorderModule } from './merchant/inventory/purchaseorder/purchaseorder.module';
import { PurchaseorderController } from './merchant/inventory/purchaseorder/purchaseorder.controller';
import { SettingsModule } from './merchant/settings/settings.module';
import { WarehouseController } from './merchant/warehouse/warehouse.controller';
import { WarehouseModule } from './merchant/warehouse/warehouse.module';
import { WholesaleController } from './merchant/inventory/wholesale/wholesale.controller';
import { WholesaleModule } from './merchant/inventory/wholesale/wholesale.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/auth.guard';




@Module({
  
    imports: [

      TypeOrmModule.forRoot(),
        
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
        PurchaseorderModule,
        PayloadvalidationModule,
        UtilityModule,
        ApiResponseModule,
        MerchantuseraccountModule,
        SettingsModule,
        WarehouseModule,
        WholesaleModule
      
       
    ],
    controllers: [AppController,CategorysController, CompanyController,CustomerController,SupplierController, ProductController,RolesController,FeaturesController,PurchaseorderController,WarehouseController,WholesaleController],
    providers: [{provide: APP_GUARD, useClass: RolesGuard }]
})

export class ApplicationModule {
    constructor() { }
}
