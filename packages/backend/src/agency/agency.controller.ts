import {
    Body,
    Controller,
    Get,
    Headers,
    HttpCode,
    HttpStatus,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { AgencyService } from './agency.service';
import {
    AgencyInterface,
    login_schema,
} from './agency.model';
import { User } from 'src/core/decorators/user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ZodPipe } from 'src/core/pipes/zod.pipe';
import { UserInterface, user_schema } from 'src/user/users.model';
import { GUARDS } from 'src/auth/constants';

export type AgencyPaylod = {
    agency_id: number;
    role: string;
};

@Controller('agency')
export class AgencyController {
    constructor(private readonly agencyService: AgencyService) {}

    @Post('/login')
    async login(
        @Body(new ZodPipe(login_schema))
        body: Pick<AgencyInterface, 'email' | 'password'>,
    ) {
        return {
            data: await this.agencyService.login(body),
        };
    }

    @Post('/logout')
    @UseGuards(AuthGuard(GUARDS.AGENCY_ACCESS_GUARD))
    @HttpCode(HttpStatus.NO_CONTENT)
    async logout(@User() user: AgencyPaylod) {
        return {
            data: await this.agencyService.logout(user.agency_id),
        };
    }

    @Post('/refresh')
    @UseGuards(AuthGuard(GUARDS.AGENCY_REFRESH_GUARD))
    async refresh_token(
        @Headers('authorization') refresh_token: string,
        @User() user: AgencyPaylod,
    ) {
        const token = refresh_token.replace('Bearer ', '').trim();
        return {
            data: await this.agencyService.refresh_token(user.agency_id, token),
        };
    }

    @UseGuards(AuthGuard(GUARDS.AGENCY_ACCESS_GUARD))
    @Get('/profile')
    async profile(@User() user: AgencyPaylod) {
        return {
            data: await this.agencyService.find_agency_by_id(user.agency_id),
        };
    }

    @Post('/create-user')
    @UseGuards(AuthGuard(GUARDS.AGENCY_ACCESS_GUARD))
    @HttpCode(HttpStatus.CREATED)
    async create_user(
        @User(new ZodPipe(user_schema)) user: AgencyPaylod,
        @Body() dto: UserInterface,
    ) {
        return {
            data: await this.agencyService.create_user(user.agency_id, dto),
        };
    }

    @Get('/get-all-users')
    @UseGuards(AuthGuard(GUARDS.AGENCY_ACCESS_GUARD))
    @HttpCode(HttpStatus.OK)
    async get_all_users(
        @User() user: AgencyPaylod,
        @Query('type') role: Pick<UserInterface, 'role' & 'all'>,
    ) {
        return {
            data: await this.agencyService.get_all_users(user.agency_id, role),
        };
    }
}
