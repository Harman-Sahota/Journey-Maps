import { Controller, Get, HttpStatus, Post, Query, Redirect, Res, Body } from '@nestjs/common';
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
    const result = await this.authService.handleDiscordCallback(code, res);
    return result
  }
  
  @Post('logout')
  async logout(@Body('discordID') discordID: string, @Res() res: Response) {
    try {
      await this.authService.logoutUser(discordID);

      res.clearCookie('session');

      return res.status(HttpStatus.OK).json({ message: 'Logout successful' });
    } catch (error) {
      console.error('Error during logout:', error);
      const status = error.message === 'User not found' ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR;
      return res.status(status).json({ message: error.message });
    }
  }

}
