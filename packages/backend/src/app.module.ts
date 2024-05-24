import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AgencyModule } from './agency/agency.module';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformationInterceptor } from './core/intreceptor/response.interceptor';
import { KanabanModule } from './kanaban/kanaban.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: './.env',
        }),
        DatabaseModule,
        AuthModule,
        AgencyModule,
        UserModule,
        KanabanModule
    ],
    controllers: [AppController],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: TransformationInterceptor,
        },
    ],
})
export class AppModule {}
