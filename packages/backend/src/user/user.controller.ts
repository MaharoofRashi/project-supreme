import {
    Body,
    Controller,
    Post,
    Headers,
    UseGuards,
    Get,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ZodPipe } from 'src/core/pipes/zod.pipe';
import { UserInterface, users_login_schema } from './users.model';
import { User } from 'src/core/decorators/user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { GUARDS } from 'src/auth/constants';

export type UserPayload = {
    user_id: number;
    email: number;
    role: string;
};

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('/login')
    async login(
        @Body(new ZodPipe(users_login_schema))
        dto: Pick<UserInterface, 'email' | 'password'>,
    ) {
        return {
            data: await this.userService.login(dto),
        };
    }

    @Post('/logout')
    @UseGuards(AuthGuard(GUARDS.USER_ACCESS_GUARD))
    @HttpCode(HttpStatus.NO_CONTENT)
    async logout(@User() user: UserPayload) {
        return {
            data: await this.userService.logout(user.user_id),
        };
    }

    @Post('/refresh')
    @UseGuards(AuthGuard(GUARDS.USERS_REFRESH_GUARD))
    async refresh_token(
        @Headers('authorization') refresh_token: string,
        @User() user: UserPayload,
    ) {
        const token = refresh_token.replace('Bearer ', '').trim();
        return {
            data: await this.userService.refresh_token(user.user_id, token),
        };
    }

    @Get('/profile')
    @UseGuards(AuthGuard(GUARDS.USER_ACCESS_GUARD))
    async profile(@User() user: UserPayload) {
        return {
            data: await this.userService.find_user_by_id(user.user_id),
        };
    }
}
