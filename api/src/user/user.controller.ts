import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateTimelineDto } from './create-timeline-dto';
import { GetTimelinesByUserDto } from './get-timelines-by-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('addTimeline')
    async create(@Body() createTimelineDto: CreateTimelineDto) {
        return this.userService.create(createTimelineDto);
    }

    @Get('timelines/:discordId') // Modified route decorator
    async getTimelinesByUser(@Param() params: GetTimelinesByUserDto) {
        return this.userService.getTimelinesByUser(params.discordId);
    }


}
