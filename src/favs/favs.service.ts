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
import { FavResponseDto } from './dto/fav-response.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavsService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
  ) {}

  private async getFavoritesItem() {
    let favs = await this.prisma.favorites.findFirst();
    if (!favs) {
      favs = await this.prisma.favorites.create({
        data: { artists: [], albums: [], tracks: [] },
      });
    }
    return favs;
  }

  async findAll(): Promise<FavResponseDto> {
    const favs = await this.getFavoritesItem();

    const artists = (
      await Promise.all(
        favs.artists.map(async (id) => {
          try {
            return await this.artistService.findOne(id);
          } catch {
            return null;
          }
        }),
      )
    ).filter(Boolean);

    const albums = (
      await Promise.all(
        favs.albums.map(async (id) => {
          try {
            return await this.albumService.findOne(id);
          } catch {
            return null;
          }
        }),
      )
    ).filter(Boolean);

    const tracks = (
      await Promise.all(
        favs.tracks.map(async (id) => {
          try {
            return await this.trackService.findOne(id);
          } catch {
            return null;
          }
        }),
      )
    ).filter(Boolean);

    return { artists, albums, tracks };
  }

  async addArtist(id: string) {
    const artist = await this.artistService.findOne(id).catch(() => {
      throw new UnprocessableEntityException(
        `Artist with given id doesn't exist.`,
      );
    });

    const favs = await this.getFavoritesItem();

    if (!favs.artists.includes(id)) {
      favs.artists.push(id);
      await this.prisma.favorites.update({
        where: { id: favs.id },
        data: { artists: favs.artists },
      });
    }

    return artist;
  }

  async removeArtist(id: string) {
    const favs = await this.getFavoritesItem();
    if (!favs.artists.includes(id))
      throw new NotFoundException('Artist not found.');

    const updatedArtists = favs.artists.filter((a) => a !== id);
    await this.prisma.favorites.update({
      where: { id: favs.id },
      data: { artists: updatedArtists },
    });
  }

  async addAlbum(id: string) {
    const album = await this.albumService.findOne(id).catch(() => {
      throw new UnprocessableEntityException(
        `Album with given id doesn't exist.`,
      );
    });

    const favs = await this.getFavoritesItem();

    if (!favs.albums.includes(id)) {
      favs.albums.push(id);
      await this.prisma.favorites.update({
        where: { id: favs.id },
        data: { albums: favs.albums },
      });
    }

    return album;
  }

  async removeAlbum(id: string) {
    const favs = await this.getFavoritesItem();
    if (!favs.albums.includes(id))
      throw new NotFoundException('Album not found.');

    const updatedAlbums = favs.albums.filter((a) => a !== id);
    await this.prisma.favorites.update({
      where: { id: favs.id },
      data: { albums: updatedAlbums },
    });
  }

  async addTrack(id: string) {
    const track = await this.trackService.findOne(id).catch(() => {
      throw new UnprocessableEntityException(
        `Track with given id doesn't exist.`,
      );
    });

    const favs = await this.getFavoritesItem();

    if (!favs.tracks.includes(id)) {
      favs.tracks.push(id);
      await this.prisma.favorites.update({
        where: { id: favs.id },
        data: { tracks: favs.tracks },
      });
    }

    return track;
  }

  async removeTrack(id: string) {
    const favs = await this.getFavoritesItem();
    if (!favs.tracks.includes(id))
      throw new NotFoundException('Track not found.');

    const updatedTracks = favs.tracks.filter((t) => t !== id);
    await this.prisma.favorites.update({
      where: { id: favs.id },
      data: { tracks: updatedTracks },
    });
  }
}
