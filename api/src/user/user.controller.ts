import { Controller, Put, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateColorDto } from './update-color.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Put('updateColor')
    async updateColor(@Body() updateColorDto: UpdateColorDto): Promise<void> {
        const { discordID, color } = updateColorDto;
        await this.userService.updateColor(discordID, color);
    }
}
