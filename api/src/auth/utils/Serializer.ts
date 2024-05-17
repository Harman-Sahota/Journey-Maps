import { PassportSerializer } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { PrismaClient, User } from "@prisma/client";

@Injectable()
export class SessionSerializer extends PassportSerializer {
    
    constructor(private readonly prisma: PrismaClient) {
        super();
    }

    async serializeUser(user: User, done: (err: Error, user: User) => void) {
        done(null, user);
    }

    async deserializeUser(payload: User, done: (err: Error, payload: User) => void) {
        const userDB;
        done(null, userDB);
    }
}
