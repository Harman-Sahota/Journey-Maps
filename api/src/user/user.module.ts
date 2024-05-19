import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseService } from 'src/database/database.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService,DatabaseService],
})
export class UserModule {}
