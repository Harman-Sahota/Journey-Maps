import { Injectable, Logger } from '@nestjs/common';
import { Prisma, User } from '@prisma/client'; // Import Prisma and User
import { DatabaseService } from 'src/database/database.service';
import axios from 'axios';
import { AuthenticationProvider } from './auth';
import { UserDetails } from 'src/utils/types';

@Injectable()
export class AuthService implements AuthenticationProvider {
  constructor(private readonly databaseService: DatabaseService, private readonly prisma: PrismaClient) { }

  async validateUser(details: UserDetails): Promise<User | null> {
    try {
      const user = await this.prisma.user.findUnique({ where: { discordId: details.discordId } });
      return user;
    } catch (error) {
      // Handle error (e.g., logging)
      console.error('Error validating user:', error);
      return null;
    }
  }

  createUser() {
    throw new Error('Method not implemented.');
  }

  findUser() {
    throw new Error('Method not implemented.');
  }
}
