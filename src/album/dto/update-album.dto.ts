import {
  IsString,
  IsInt,
  IsNotEmpty,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class UpdateAlbumDto {
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
