import {
    Body,
    Controller,
    Get,
    Headers,
    HttpCode,
    HttpStatus,
    Post,
    UseGuards,
} from '@nestjs/common';
import { AgencyService } from './agency.service';
import { AgencyInterface } from './agency.model';
import { User } from 'src/core/decorators/user.decorator';
import { AuthGuard } from '@nestjs/passport';

export type AgencyPaylod = {
    agency_id: number;
    role: string;
};

export type RefreshAgencyPaylod = {
    agency_id: number;
    role: string;
    refresh_token: string;
};

@Controller('agency')
export class AgencyController {
    constructor(private readonly agencyService: AgencyService) {}

    @Post('/login')
    async login(@Body() body: Pick<AgencyInterface, 'email' | 'password'>) {
        return {
            data: await this.agencyService.login(body),
        };
    }

    @Post('/logout')
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(HttpStatus.NO_CONTENT)
    async logout(@User() user: AgencyPaylod) {
        return {
            data: await this.agencyService.logout(user.agency_id),
        };
    }

    @Post('/refresh')
    @UseGuards(AuthGuard('jwt-refresh'))
    async refresh(
        @Headers('authorization') refresh_token: string,
        @User() user: RefreshAgencyPaylod,
    ) {
        const token = refresh_token.replace('Bearer ', '').trim();
        return {
            data: await this.agencyService.refresh_token(user.agency_id, token),
        };
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/profile')
    async profile(@User() user: AgencyPaylod) {
        return {
            data: await this.agencyService.find_agency_by_id(user.agency_id),
        };
    }
}
