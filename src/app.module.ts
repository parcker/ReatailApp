import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import { RolesController } from './roles/roles.controller';
import { RolesModule } from './roles/roles.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        UsersModule,
        AuthModule,
        RolesModule
    ],
    controllers: [AppController],
    providers: []
})

export class ApplicationModule {
    constructor(private readonly connection: Connection) { }
}
