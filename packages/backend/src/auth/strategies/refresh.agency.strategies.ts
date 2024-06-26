import { ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtSecretRequestType } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy, ExtractJwt } from 'passport-jwt';
import * as request from 'supertest';
import { GUARDS } from '../constants';

@Injectable()
export class AgencyRefresStrategy extends PassportStrategy(
    Strategy,
    GUARDS.AGENCY_REFRESH_GUARD,
) {
    constructor(private readonly configService: ConfigService) {
        super({
            secretOrKey: process.env.REFRESH_JWT_SECRET_AGENCY,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
        });
    }

    async validate(payload: any) {
        return {
            payload,
        };
    }
}
