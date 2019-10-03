import { Module, ValidationPipe } from '@nestjs/common';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import { RolesModule } from './roles/roles.module';
import { CompanyModule } from './company/company.module';
import { AccountModule } from './account/account.module';

import { APP_PIPE } from '@nestjs/core';


@Module({
    imports: [
        TypeOrmModule.forRoot(),
        UsersModule,
        AuthModule,
        RolesModule,
        CompanyModule,
        AccountModule
        
    ],
    controllers: [AppController],
    providers: [{provide: APP_PIPE, useClass: ValidationPipe, }]
})

export class ApplicationModule {
    constructor(private readonly connection: Connection) { }
}
