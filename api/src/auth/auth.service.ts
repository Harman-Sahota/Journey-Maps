import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import axios from 'axios';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly databaseService: DatabaseService) { }

  async createOrUpdateUser(user: any) {
    try {
      const existingUser = await this.databaseService.user.findUnique({
        where: { discordId: user.discordId },
      });

      if (existingUser) {
        return this.databaseService.user.update({
          where: { discordId: user.discordId },
          data: user,
        });
      }

      return this.databaseService.user.create({
        data: user,
      });
    } catch (error) {
      this.logger.error('Error creating/updating user', error);
      throw error;
    }
  }

  async refreshToken(userId: number) {
    try {
      const user = await this.databaseService.user.findUnique({ where: { id: userId } });

      if (!user || !user.refreshToken) {
        throw new Error('User or refresh token not found');
      }

      const response = await axios.post('https://discord.com/api/oauth2/token', null, {
        params: {
          client_id: process.env.DISCORD_CLIENT_ID,
          client_secret: process.env.DISCORD_CLIENT_SECRET,
          grant_type: 'refresh_token',
          refresh_token: user.refreshToken,
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const { access_token, refresh_token } = response.data;

      await this.databaseService.user.update({
        where: { id: userId },
        data: {
          accessToken: access_token,
          refreshToken: refresh_token,
        },
      });

      return {
        accessToken: access_token,
        refreshToken: refresh_token,
      };
    } catch (error) {
      this.logger.error('Error refreshing token', error);
      throw error;
    }
  }

  async findAll() {
    return `This action returns all auth`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  async update(id: number, updateAuthDto: Prisma.UserUpdateInput) {
    return `This action updates a #${id} auth`;
  }

  async remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
