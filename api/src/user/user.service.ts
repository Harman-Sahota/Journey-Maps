import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private prisma: DatabaseService) { }

    async updateColor(discordID: string, color: string): Promise<void> {
        await this.prisma.user.update({
            where: {
                discordId: discordID,
            },
            data: {
                color: color,
            },
        });
    }

}
