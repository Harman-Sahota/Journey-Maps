import { IsString } from 'class-validator';

export class UpdateColorDto {
  @IsString()
  discordID: string;

  @IsString()
  color: string;
}
