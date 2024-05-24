import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AgencyAccessStrategy } from './strategies/access.agency.strategies';
import { AgencyRefresStrategy } from './strategies/refresh.agency.strategies';
import { UsersAccessStrategy } from './strategies/access.users.strategies';
import { UsersRefreshStrategy } from './strategies/refresh.users.strategies';

@Module({
    imports: [UserModule, JwtModule.register({})],
    providers: [
        JwtService,
        AgencyAccessStrategy,
        AgencyRefresStrategy,
        UsersAccessStrategy,
        UsersRefreshStrategy,
        AuthService,
    ],
    controllers: [],
    exports: [AuthService],
})
export class AuthModule {}
