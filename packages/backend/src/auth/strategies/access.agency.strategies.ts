import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtSecretRequestType } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class AgencyAccessStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private readonly configService: ConfigService) {
        super({
            secretOrKey: process.env.ACCESS_JWT_SECRET_AGENCY,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
        });
    }

    async validate(payload: { sub: string; agency_id: string; role: string }) {
        return payload
    }
}
