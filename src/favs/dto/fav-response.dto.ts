import { Album, Artist, Track } from 'generated/prisma/client';

export class FavResponseDto {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
