import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}

    async find_user_by_email(email: string) {
        const user = await this.prismaService.users.findFirst({
            where: {
                email: email,
            },
        });
        return user;
    }
}
