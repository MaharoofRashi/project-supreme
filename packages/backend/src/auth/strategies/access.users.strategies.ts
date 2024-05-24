import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtSecretRequestType } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { GUARDS } from '../constants';

@Injectable()
export class UsersAccessStrategy extends PassportStrategy(
    Strategy,
    GUARDS.USER_ACCESS_GUARD,
) {
    constructor(private readonly configService: ConfigService) {
        super({
            secretOrKey: process.env.ACCESS_JWT_SECRET_USERS,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
        });
    }

    async validate(payload: object) {
        return payload;
    }
}
