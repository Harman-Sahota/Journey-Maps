import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Response } from 'express';
import { randomBytes } from 'crypto';
import axios from 'axios';

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

            const User = await this.prisma.user.findUnique({
                where: { discordId: userData.id },
            });

            const sessionToken = randomBytes(32).toString('hex');

            res.cookie('session', sessionToken, { maxAge: 86400000, httpOnly: true });

            res.redirect(`http://localhost:3000/dashboard?sessionToken=${sessionToken}&name=${savedUser.name}&email=${savedUser.email}&avatar=${savedUser.avatar}&discordID=${savedUser.discordId}`);

            return {
                statusCode: HttpStatus.CREATED,
                headers: { Location: `http://localhost:3000/dashboard?sessionToken=${sessionToken}&name=${savedUser.name}&email=${savedUser.email}&avatar=${savedUser.avatar}&discordID=${savedUser.discordId}` }
            };
        } catch (error) {
            console.error('Error handling Discord callback:', error);
            throw error;
        }
    }

    async revokeToken(discordID: string): Promise<void> {
        try {
            const user = await this.prisma.user.findUnique({
                where: { discordId: discordID },
            });

            if (!user) {
                throw new Error('User not found');
            }

            const data = new URLSearchParams({
                'token': user.accessToken,
                'token_type_hint': 'access_token'
            }).toString();

            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${Buffer.from(`${process.env.DISCORD_CLIENT_ID}:${process.env.DISCORD_CLIENT_SECRET}`).toString('base64')}`
            };

            await axios.post('https://discord.com/api/v9/oauth2/token/revoke', data, { headers });
        } catch (error) {
            console.error('Error revoking access token:', error);
            throw new Error('Failed to revoke access token');
        }
    }

    async logoutUser(discordID: string): Promise<void> {
        const user = await this.prisma.user.findUnique({
            where: { discordId: discordID },
        });

        if (!user) {
            throw new Error('User not found');
        }

        await this.revokeToken(discordID);

    }
}
