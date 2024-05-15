import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { user } from './schemas/user.schema';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Get()
    async getAllUsers(): Promise<user[]> {
        return this.userService.findAll()
    }
}
