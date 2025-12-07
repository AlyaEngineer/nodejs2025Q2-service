import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateAlbumDto) {
    return this.prisma.album.create({
      data: {
        name: dto.name,
        year: dto.year,
        artistId: dto.artistId ?? null,
      },
    });
  }

  async findAll() {
    return this.prisma.album.findMany();
  }

  async findOne(id: string) {
    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album) throw new NotFoundException('Album not found');
    return album;
  }

  async update(id: string, dto: UpdateAlbumDto) {
    const exists = await this.prisma.album.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Album not found');

    return this.prisma.album.update({
      where: { id },
      data: {
        name: dto.name,
        year: dto.year,
        artistId: dto.artistId ?? null,
      },
    });
  }

  async remove(id: string) {
    const exists = await this.prisma.album.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Album not found');

    await this.prisma.album.delete({ where: { id } });

    await this.prisma.track.updateMany({
      where: { albumId: id },
      data: { albumId: null },
    });
  }

  async removeArtistId(artistId: string) {
    await this.prisma.album.updateMany({
      where: { artistId },
      data: { artistId: null },
    });
  }
}
