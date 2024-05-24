import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { BoardInterface } from './kanaban.model';

@Injectable()
export class BoardService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(agency_id: number, data: BoardInterface) {
        let board = await this.prismaService.boards.findFirst({
            where: {
                name: data.name,
                owner_id: agency_id,
            },
        });

        if (board)
            throw new ConflictException('A board already exist with this name');

        board = await this.prismaService.boards.create({
            data: {
                name: data.name,
                owner: {
                    connect: {
                        id: agency_id,
                    },
                },
            },
        });
        return board;
    }

    async get_all(agency_id: number) {
        return this.prismaService.boards.findMany({
            where: {
                owner_id: agency_id,
            },
        });
    }

    async get_one(id: number) {
        const board = await this.prismaService.boards.findFirst({
            where: {
                id,
            },
            include: {
                columns: true,
            },
        });
        if (!board) throw new NotFoundException('no board found');
        return board;
    }

    async update(id: number, agency_id: number, data: BoardInterface) {
        await this.get_one(id);
        const board = await this.prismaService.boards.update({
            where: {
                id,
                owner_id: agency_id,
            },
            data,
        });
        return board;
    }
}
