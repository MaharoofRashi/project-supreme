import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
    this.$use(async (params, next) => {
      await this.audit_logs.create({
        data: {
          action: params.action,
          model: params.model,
          changes: params.args,
        },
      });
    });
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
