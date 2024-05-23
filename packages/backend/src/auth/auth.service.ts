import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async signup(email: string) {
        let user = await this.userService.find_user_by_email(email);
    }

    async generate_token(payload: object, secret: string, expiresIn: string) {
        return await this.jwtService.signAsync(payload, {
            expiresIn,
            secret,
        });
    }

    async decode_token(token: string, secret: string) {
        return await this.jwtService.verifyAsync(token, {
            secret,
        });
    }
}
