import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy
{
    constructor() {
        super();
        this.$use(async (params, next) => {
            const result = await next(params);

            const after = Date.now();

            if (
                params.model &&
                (params.action === 'create' ||
                    params.action === 'update' ||
                    params.action === 'delete') &&
                params.model !== 'audit_logs'
            ) {
                const changes = {
                    action: params.action.toUpperCase(),
                    model: params.model,
                    timestamp: new Date(after).toISOString(),
                    old: {},
                    new: {},
                };

                if (params.action === 'update' || params.action === 'delete') {
                    const original = await this.getOriginalData(
                        this,
                        params.model,
                        params.args.where,
                    );
                    changes['old'] = original;
                }

                if (params.action === 'create' || params.action === 'update') {
                    changes['new'] = params.args.data;
                }

                await this.audit_logs.create({
                    data: changes,
                });
            }

            return result;
        });
    }

    async onModuleInit() {
        await this.$connect();
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }

    getOriginalData(prisma: PrismaClient, modelName: string, where: any) {
        switch (modelName) {
            case 'agency':
                return prisma.agency.findUnique({ where });
            case 'users':
                return prisma.users.findUnique({ where });
            case 'boards':
                return prisma.boards.findUnique({ where });
            case 'columns':
                return prisma.columns.findUnique({ where });
            case 'tasks':
                return prisma.tasks.findUnique({ where });
            case 'customers':
                return prisma.customers.findUnique({ where });
            default:
                console.warn('Unsupported model:', modelName);
                return null;
        }
    }
}
