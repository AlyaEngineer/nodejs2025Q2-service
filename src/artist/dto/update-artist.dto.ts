import { IsString, IsNotEmpty, IsBoolean, IsDefined } from 'class-validator';

export class UpdateArtistDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsDefined()
  grammy: boolean;
}
