import { Module } from '@nestjs/common';
import { KanabanController } from './kanaban.controller';
import { BoardService } from './board.service';
import { CloumnService } from './column.service';

@Module({
    controllers: [KanabanController],
    providers: [BoardService, CloumnService],
})
export class KanabanModule {}
