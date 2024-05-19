import { Controller, Get, Query, Redirect, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get('discord')
  @Redirect()
  async discord() {
    const redirectUri = process.env.DISCORD_REDIRECT_URI;
    if (redirectUri) {
      return { url: redirectUri };
    } else {
      return { url: '/', statusCode: 500 };
    }
  }

  @Get('redirect')
  async discordRedirect(@Query('code') code: string, @Res() res: Response) {
    const result = await this.authService.handleDiscordCallback(code,res);
    return result
  }
}
