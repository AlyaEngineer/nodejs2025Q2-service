import {
  IsString,
  IsInt,
  IsNotEmpty,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  year: number;

  @ValidateIf((object) => object.artistId !== null)
  @IsUUID()
  artistId: string | null;
}
