import { Controller, Get, Req, Res, UseGuards, Redirect } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import axios from 'axios';
import { DiscordAuthGuard } from './guards';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get('login')
  @UseGuards(DiscordAuthGuard)
  login() {
    return;
  }

  @Get('redirect')
  @UseGuards(DiscordAuthGuard)
  redirect(@Res() res:Response) {
    res.send(200);
  }

  @Get('status')
  status() {

  }

  @Get('logout')
  logout() {

  }
}
