import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Response } from 'express';
@Injectable()
export class AuthService {
    constructor(private prisma: DatabaseService) { }

    async handleDiscordCallback(code: string, @Res() res: Response): Promise<any> {
        try {
            let options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    'client_id': process.env.DISCORD_CLIENT_ID,
                    'client_secret': process.env.DISCORD_CLIENT_SECRET,
                    'grant_type': 'authorization_code',
                    'code': code,
                    'redirect_uri': process.env.DISCORD_CALLBACK_URL,
                    'scope': 'identify email'
                }).toString() // Convert body to string
            };

            // Fetch access token
            let discordResponse = await fetch('https://discord.com/api/oauth2/token', options);
            if (!discordResponse.ok) {
                throw new Error(`Failed to fetch access token: ${discordResponse.statusText}`);
            }
            let discordData = await discordResponse.json();

            // Fetch user info
            const userInfoResponse = await fetch('https://discord.com/api/v9/users/@me', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${discordData.access_token}`,
                },
            });

            if (!userInfoResponse.ok) {
                throw new Error(`Failed to fetch user info: ${userInfoResponse.statusText}`);
            }

            const userData = await userInfoResponse.json();

            // Upsert user
            const savedUser = await this.prisma.user.upsert({
                where: { discordId: userData.id }, // Search by discordId
                update: {
                    name: userData.global_name,
                    email: userData.email,
                    accessToken: discordData.access_token,
                    refreshToken: discordData.refresh_token,
                    avatar: userData.avatar,
                },
                create: {
                    name: userData.global_name,
                    discordId: userData.id,
                    email: userData.email,
                    accessToken: discordData.access_token,
                    refreshToken: discordData.refresh_token,
                    avatar: userData.avatar,
                },
            });

            res.redirect('http://localhost:3000');

            return {
                statusCode: HttpStatus.CREATED,
                data: savedUser,
                headers: { Location: 'http://localhost:3000' }
            };
        } catch (error) {
            console.error('Error handling Discord callback:', error);
            throw error;
        }
    }
}
