import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/database/database.module';
import { PassportModule } from '@nestjs/passport';
import { DiscordStrategy } from './strategies';

@Module({
  imports: [DatabaseModule, PassportModule.register({ session: true })],
  controllers: [AuthController],
  providers: [DiscordStrategy, {
    provide: "AUTH_SERVICE",
    useClass: AuthService
  },
  ],
})
export class AuthModule { }
