import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entities/album.entity';

@Injectable()
export class AlbumService {
  public albums: AlbumEntity[] = [];

  create(dto: CreateAlbumDto) {
    const album = AlbumEntity.create(dto.name, dto.year, dto.artistId);
    this.albums.push(album);
    return album;
  }

  findAll() {
    return this.albums;
  }

  findOne(id: string) {
    const album = this.albums.find((a) => a.id === id);
    if (!album) {
      throw new NotFoundException('Album was not found');
    }
    return album;
  }

  update(id: string, dto: UpdateAlbumDto): AlbumEntity {
    const album = this.albums.find((a) => a.id === id);
    if (!album) {
      throw new NotFoundException('Album was not found');
    }

    album.update({
      name: dto.name,
      year: dto.year,
      artistId: dto.artistId,
    });
    return album;
  }

  remove(id: string) {
    const index = this.albums.findIndex((a) => a.id === id);
    if (index === -1) {
      throw new NotFoundException('Album was not found');
    }

    this.albums.splice(index, 1);
  }
}
