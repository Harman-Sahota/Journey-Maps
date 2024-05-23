import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import { CreateTimelineDto } from './create-timeline-dto';


@Injectable()
export class UserService {
    constructor(private prisma: DatabaseService) { }

    async create(createTimelineDto: CreateTimelineDto): Promise<void> {
        const { discordId, name } = createTimelineDto;

        const user = await this.prisma.user.findUnique({
            where: { discordId: discordId }
        });

        if (!user) {
            throw new Error(`User with discordId ${discordId} not found.`);
        }

        const newTimeline = await this.prisma.timeline.create({
            data: {
                name: name,
                user: { connect: { discordId: user.discordId } }
            } as Prisma.TimelineCreateInput
        });
    }



    async getTimelinesByUser(discordId: string): Promise<string[]> {
        const timelines = await this.prisma.timeline.findMany({
            where: {
                discordId: discordId,
            },
            select: {
                name: true,
            },
        });

        return timelines.map((timeline) => timeline.name);
    }
}
