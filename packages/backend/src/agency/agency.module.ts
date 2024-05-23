import { Module } from '@nestjs/common';
import { AgencyService } from './agency.service';
import { AgencyController } from './agency.controller';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[AuthModule],
  controllers: [AgencyController],
  providers: [AgencyService],
})
export class AgencyModule {}
