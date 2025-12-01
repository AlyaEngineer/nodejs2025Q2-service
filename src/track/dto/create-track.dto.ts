import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @ValidateIf((object) => object.artistId !== null)
  @IsUUID()
  artistId: string | null;

  @IsNotEmpty()
  @ValidateIf((object) => object.albumId !== null)
  @IsUUID()
  albumId: string | null;

  @IsNotEmpty()
  @IsInt()
  duration: number;
}
