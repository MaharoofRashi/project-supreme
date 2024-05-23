import {
    ForbiddenException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { AgencyInterface } from './agency.model';
import { AuthService } from '../auth/auth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AgencyService {
    constructor(
        private readonly configService: ConfigService,
        private readonly prismaService: PrismaService,
        private readonly authService: AuthService,
    ) {}

    async login(login_dto: Pick<AgencyInterface, 'email' | 'password'>) {
        const agency = await this.find_agency_by_email(login_dto.email);
        if (!agency)
            throw new NotFoundException(
                "sorry this email dosen't have an account",
            );
        // todo: need to hash password before saving in db
        if (agency.password !== login_dto.password)
            throw new ForbiddenException('Password was incorrect');

        const access_token = await this.authService.generate_token(
            {
                agency_id: agency.id,
                role: 'admin',
            },
            this.configService.get<string>('ACCESS_JWT_SECRET_AGENCY'),
            this.configService.get<string>('ACCESS_JWT_EXPIRATION_AGENCY'),
        );

        const refresh_token = await this.authService.generate_token(
            {
                agency_id: agency.id,
                role: 'admin',
            },
            this.configService.get<string>('REFRESH_JWT_SECRET_AGENCY'),
            this.configService.get<string>('REFRESH_JWT_EXPIRATION_AGENCY'),
        );

        await this.prismaService.agency.update({
            where: {
                id: agency.id,
            },
            data: { refresh_token },
        });

        return {
            access_token,
            refresh_token,
        };
    }

    async logout(id: number) {
        const agency = await this.find_agency_by_id(id);
        await this.prismaService.agency.update({
            where: {
                id: agency.id,
            },
            data: {
                refresh_token: null,
            },
        });
        return true;
    }

    async refresh_token(id: number, token: string) {
        const agency = await this.find_agency_by_id(id, true);
        if (agency.refresh_token !== token)
            throw new UnauthorizedException('not a valid refresh token');
        const access_token = await this.authService.generate_token(
            {
                agency_id: agency.id,
                role: 'admin',
            },
            this.configService.get<string>('ACCESS_JWT_SECRET_AGENCY'),
            this.configService.get<string>('ACCESS_JWT_EXPIRATION_AGENCY'),
        );

        return access_token;
    }

    async find_agency_by_email(email: string) {
        let agency = await this.prismaService.agency.findFirst({
            where: {
                email,
            },
        });
        return agency;
    }

    async find_agency_by_id(id: number, include_token: boolean = false) {
        const agency = await this.prismaService.agency.findFirst({
            where: {
                id,
            },
            select: {
                id: true,
                name: true,
                address: true,
                email: true,
                phone: true,
                refresh_token: include_token,
            },
        });
        if (!agency) throw new NotFoundException('no agency found');
        return agency;
    }
}
