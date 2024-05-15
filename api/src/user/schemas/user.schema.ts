import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { Prop } from '@nestjs/mongoose';


@Schema({
    timestamps: false
})

export class user{
  @Prop({ required: true })
  discordId: string;

  @Prop({ required: true })
  username: string;

  @Prop()
  avatar: string;

  @Prop({ required: true })
  accessToken: string;

  @Prop({ required: true })
  refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(user)