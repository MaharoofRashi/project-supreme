import {
    ForbiddenException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UserInterface } from './users.model';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly authService: AuthService,
    ) {}

    async find_user_by_email(email: string) {
        const user = await this.prismaService.users.findFirst({
            where: {
                email: email,
            },
        });
        return user;
    }

    async login(data: Pick<UserInterface, 'email' | 'password'>) {
        const user = await this.find_user_by_email(data.email);
        if (!user) {
            throw new NotFoundException('no user found');
        }
        // todo: hash password verification
        const is_password_valid = user.password === data.password;

        if (!is_password_valid)
            throw new ForbiddenException('password was incorrects');

        const access_token = await this.authService.generate_token(
            { user_id: user.id, role: user.role, email: user.email },
            process.env.ACCESS_JWT_SECRET_USERS,
            process.env.ACCESS_JWT_EXPIRATION_USERS,
        );

        const refresh_token = await this.authService.generate_token(
            { user_id: user.id, role: user.role, email: user.email },
            process.env.ACCESS_JWT_SECRET_USERS,
            process.env.ACCESS_JWT_EXPIRATION_USERS,
        );
        await this.prismaService.users.update({
            where: { id: user.id },
            data: {
                refresh_token,
            },
        });
        return {
            access_token,
            refresh_token,
        };
    }

    async refresh_token(id: number, token: string) {
        const user = await this.find_user_by_id(id);
        if (user.refresh_token !== token)
            throw new UnauthorizedException('not a valid refresh token');
        const access_token = await this.authService.generate_token(
            {
                user_id: user.id,
                role: user.role,
                email: user.email,
            },
            process.env.ACCESS_JWT_SECRET_USERS,
            process.env.ACCESS_JWT_EXPIRATION_USERS,
        );

        return access_token;
    }

    async find_user_by_id(id: number) {
        const user = await this.prismaService.users.findFirst({
            where: { id },
        });
        if (!user) throw new NotFoundException('no user found');
        return user;
    }
    async logout(id: number) {
        const user = await this.find_user_by_id(id);
        await this.prismaService.users.update({
            where: {
                id: user.id,
            },
            data: {
                refresh_token: null,
            },
        });
        return true;
    }
}
