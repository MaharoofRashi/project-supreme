import {
    Controller,
    Post,
    Get,
    Patch,
    Body,
    Param,
    UseGuards,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CloumnService } from './column.service';
import { UserPayload } from 'src/user/user.controller';
import { User } from 'src/core/decorators/user.decorator';
import { ZodPipe } from 'src/core/pipes/zod.pipe';
import {
    BoardInterface,
    CloumnInterface,
    board_schema,
    column_schema,
    update_column_schema,
} from './kanaban.model';
import { AuthGuard } from '@nestjs/passport';
import { GUARDS } from 'src/auth/constants';

@Controller('kanaban')
export class KanabanController {
    constructor(
        private readonly boardService: BoardService,
        private readonly columnService: CloumnService,
    ) {}

    @Post('/board/create')
    @UseGuards(AuthGuard(GUARDS.USER_ACCESS_GUARD))
    async create_board(
        @User() user: UserPayload,
        @Body(new ZodPipe(board_schema)) data: BoardInterface,
    ) {
        return {
            data: await this.boardService.create(user.agency_id, data),
        };
    }

    @Get('/boards/all')
    @UseGuards(AuthGuard(GUARDS.USER_ACCESS_GUARD))
    async get_all_board(@User() user: UserPayload) {
        return {
            data: await this.boardService.get_all(user.agency_id),
        };
    }

    @Get('/board/:id')
    @UseGuards(AuthGuard(GUARDS.USER_ACCESS_GUARD))
    async get_one_board(@Param('id') id: string) {
        return {
            data: await this.boardService.get_one(+id),
        };
    }

    @Patch('/board/update/:id')
    @UseGuards(AuthGuard(GUARDS.USER_ACCESS_GUARD))
    async update_board(
        @Param('id') id: string,
        @User() user: UserPayload,
        @Body(new ZodPipe(board_schema)) data: BoardInterface,
    ) {
        return {
            data: await this.boardService.update(+id, user.agency_id, data),
        };
    }

    @Post('/column/create')
    @UseGuards(AuthGuard(GUARDS.USER_ACCESS_GUARD))
    async create_column(
        @User() user: UserPayload,
        @Body(new ZodPipe(column_schema)) data: CloumnInterface,
    ) {
        return {
            data: await this.columnService.create(user.agency_id, data),
        };
    }

    @Get('/column/all/:id')
    @UseGuards(AuthGuard(GUARDS.USER_ACCESS_GUARD))
    async get_all_column(@Param('id') id: string) {
        return {
            data: await this.columnService.get_all(+id),
        };
    }

    @Get('/column/:id')
    @UseGuards(AuthGuard(GUARDS.USER_ACCESS_GUARD))
    async get_one_column(@Param('id') id: string) {
        return {
            data: await this.columnService.get_one(+id),
        };
    }

    @Patch('/column/update/:id')
    @UseGuards(AuthGuard(GUARDS.USER_ACCESS_GUARD))
    async update_column(
        @Param('id') id: string,
        @User() user: UserPayload,
        @Body(new ZodPipe(update_column_schema)) data: CloumnInterface,
    ) {
        return {
            data: await this.columnService.update(+id,user.agency_id, data),
        };
    }
}
