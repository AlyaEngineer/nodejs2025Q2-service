import {
  IsString,
  IsNotEmpty,
  ValidateIf,
  IsUUID,
  IsInt,
} from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @ValidateIf((object) => object.artistId !== null)
  @IsUUID()
  artistId: string | null;

  @IsNotEmpty()
  @ValidateIf((object) => object.albumId !== null)
  @IsUUID()
  albumId: string | null;

  @IsInt()
  @IsNotEmpty()
  duration: number;
}
