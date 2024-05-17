import { Profile, Strategy } from "passport-discord";
import { PassportStrategy } from "@nestjs/passport";
import { Inject, Injectable } from "@nestjs/common";
import { AuthenticationProvider } from "../auth";

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy) {

    constructor(@Inject('AUTH_SERVUCE') private readonly authService: AuthenticationProvider) {
        super({
            clientID: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
            callbackURL: process.env.DISCORD_CALLBACK_URL,
            scope: ['identify', 'email']
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile) {
        const { id: discordId, email, avatar, username: name} = profile
        const details = {discordId, email, avatar, name};
        await this.authService.validateUser(details)
    }


}