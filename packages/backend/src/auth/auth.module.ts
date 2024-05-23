import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AgencyAccessStrategy } from './strategies/access.agency.strategies';
import { AgencyRefresStrategy } from './strategies/refresh.agency.strategies';

@Module({
    imports: [UserModule, JwtModule.register({})],
    providers: [
        AuthService,
        JwtService,
        AgencyAccessStrategy,
        AgencyRefresStrategy,
    ],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}
