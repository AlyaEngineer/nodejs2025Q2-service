import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class ArtistService {
  constructor(
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  public artists: ArtistEntity[] = [];

  create(dto: CreateArtistDto) {
    const artist = ArtistEntity.create(dto.name, dto.grammy);
    this.artists.push(artist);
    return artist;
  }

  findAll(): ArtistEntity[] {
    return this.artists;
  }

  findOne(id: string): ArtistEntity {
    const artist = this.artists.find((a) => a.id === id);
    if (!artist) {
      throw new NotFoundException('Artist was not found');
    }
    return artist;
  }
  update(id: string, dto: UpdateArtistDto): ArtistEntity {
    const artist = this.artists.find((a) => a.id === id);
    if (!artist) {
      throw new NotFoundException('Artist was not found');
    }

    artist.update({ name: dto.name, grammy: dto.grammy });
    return artist;
  }

  remove(id: string): void {
    const index = this.artists.findIndex((a) => a.id === id);
    if (index === -1) {
      throw new NotFoundException('Artist was not found');
    }

    this.artists.splice(index, 1);

    this.albumService.removeArtistId(id);

    this.trackService.removeArtistId(id);
  }
}
