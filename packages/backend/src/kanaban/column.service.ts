import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CloumnInterface } from './kanaban.model';

@Injectable()
export class CloumnService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(agency_id: number, data: CloumnInterface) {
        let cloumn = await this.prismaService.columns.findFirst({
            where: {
                board: {
                    id: data.board_id,
                    owner: {
                        id: agency_id,
                    },
                },
                position: data.position,
            },
        });

        if (cloumn)
            throw new ConflictException(
                'already a cloumn exist at this position',
            );
        cloumn = await this.prismaService.columns.create({
            data: {
                name: data.name,
                position: data.position,
                board: {
                    connect: {
                        id: data.board_id,
                    },
                },
            },
        });

        return cloumn;
    }

    async get_all(board_id: number) {
        return this.prismaService.columns.findMany({
            where: {
                board_id,
            },
        });
    }

    async get_one(id: number) {
        const cloumn = await this.prismaService.columns.findFirst({
            where: {
                id,
            },
            include: {
                tasks: true,
            },
        });
        if (!cloumn) throw new NotFoundException('no cloumn found');
        return cloumn;
    }

    async update(id: number, agency_id: number, data: CloumnInterface) {
        await this.get_one(id);
        const cloumn = await this.prismaService.columns.update({
            where: {
                id,
                board_id: data.board_id,
                board: {
                    owner: {
                        id: agency_id,
                    },
                },
            },
            data,
        });
        return cloumn;
    }
}
