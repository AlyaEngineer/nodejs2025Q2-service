import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { TrackService } from 'src/track/track.service';
import { CreateFavoritesDto } from './dto/create-fav.dto';
import { FavResponseDto } from './dto/fav-response.dto';

@Injectable()
export class FavsService {
  private favorites: CreateFavoritesDto = {
    artists: [],
    albums: [],
    tracks: [],
  };

  constructor(
    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
  ) {}

  async findAll(): Promise<FavResponseDto> {
    return {
      artists: (
        await Promise.all(
          this.favorites.artists.map(async (id) => {
            try {
              return await this.artistService.findOne(id);
            } catch {
              return null;
            }
          }),
        )
      ).filter(Boolean),
      albums: (
        await Promise.all(
          this.favorites.albums.map(async (id) => {
            try {
              return await this.albumService.findOne(id);
            } catch {
              return null;
            }
          }),
        )
      ).filter(Boolean),
      tracks: (
        await Promise.all(
          this.favorites.tracks.map(async (id) => {
            try {
              return await this.trackService.findOne(id);
            } catch {
              return null;
            }
          }),
        )
      ).filter(Boolean),
    };
  }

  async addTrack(id: string) {
    let track;
    try {
      track = await this.trackService.findOne(id);
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new UnprocessableEntityException(`Track with id doesn't exist.`);
      }
      throw err;
    }

    if (!this.favorites.tracks.includes(id)) this.favorites.tracks.push(id);
    return track;
  }

  async removeTrack(id: string) {
    const index = this.favorites.tracks.indexOf(id);
    if (index === -1) throw new NotFoundException('Track was not found.');
    this.favorites.tracks.splice(index, 1);
  }

  async addAlbum(id: string) {
    let album;
    try {
      album = await this.albumService.findOne(id);
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new UnprocessableEntityException(`Album with id doesn't exist.`);
      }
      throw err;
    }

    if (!this.favorites.albums.includes(id)) this.favorites.albums.push(id);
    return album;
  }

  async removeAlbum(id: string) {
    const index = this.favorites.albums.indexOf(id);
    if (index === -1) throw new NotFoundException('Album was not found.');
    this.favorites.albums.splice(index, 1);
  }

  async addArtist(id: string) {
    let artist;
    try {
      artist = await this.artistService.findOne(id);
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new UnprocessableEntityException(`Artist with id doesn't exist.`);
      }
      throw err;
    }

    if (!this.favorites.artists.includes(id)) this.favorites.artists.push(id);
    return artist;
  }

  async removeArtist(id: string) {
    const index = this.favorites.artists.indexOf(id);
    if (index === -1) throw new NotFoundException('Artist was not found.');
    this.favorites.artists.splice(index, 1);
  }
}
