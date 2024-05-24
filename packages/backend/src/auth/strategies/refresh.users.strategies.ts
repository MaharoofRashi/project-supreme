import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtSecretRequestType } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { GUARDS } from '../constants';

@Injectable()
export class UsersRefreshStrategy extends PassportStrategy(
    Strategy,
    GUARDS.AGENCY_ACCESS_GUARD,
) {
    constructor(private readonly configService: ConfigService) {
        super({
            secretOrKey: process.env.REFRESH_JWT_SECRET_USERS,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
        });
    }

    async validate(payload: object) {
        return payload;
    }
}
