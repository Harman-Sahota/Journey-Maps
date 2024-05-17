import { Controller, Get, Req, Res, UseGuards, Redirect } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import axios from 'axios';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get('discord')
  @Redirect()
  async redirectToDiscordAuth() {
    const discordAuthUrl = process.env.REDIRECT_URI;

    return { url: discordAuthUrl };
  }

  @Get('discord/redirect')
  @UseGuards(AuthGuard('discord'))
  async discordAuthRedirect(@Req() req: Request, @Res() res: Response) {
    try {
      const { code } = req.query;

      if (!code) {
        throw new Error('No authorization code provided');
      }

      console.log("Code:" , code.toString())

      const formData = new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID,
        client_secret: process.env.DISCORD_CLIENT_SECRET,
        grant_type: 'authorization_code',
        code: code.toString(),
        redirect_uri: process.env.REDIRECT_URI
      });


      // const response = await axios.post('https://discord.com/api/v10/oauth2/token', formData, {
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded',
      //   },
      // });

      // if (response.data) {

      //   const access = response.data.access_token;

      //   const userInfo = await axios.get('https://discord.com/api/v10/users/@me', {
      //     headers: {
      //       'Authorization': `Bearer ${access}`
      //     }
      //   })
      //   console.log(response.data, userInfo.data)
      //   // res.redirect('http://localhost:3000'); 
      // } else {
      //   throw new Error('Failed to exchange code for token');
      // }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
}
