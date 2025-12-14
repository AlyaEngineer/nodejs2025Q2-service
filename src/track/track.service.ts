import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrackService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateTrackDto) {
    return this.prisma.track.create({
      data: {
        name: dto.name,
        artistId: dto.artistId ?? null,
        albumId: dto.albumId ?? null,
        duration: dto.duration,
      },
    });
  }

  async findAll() {
    return this.prisma.track.findMany();
  }

  async findOne(id: string) {
    const track = await this.prisma.track.findUnique({ where: { id } });
    if (!track) throw new NotFoundException('Track not found');
    return track;
  }

  async update(id: string, dto: UpdateTrackDto) {
    const exists = await this.prisma.track.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Track not found');

    return this.prisma.track.update({
      where: { id },
      data: {
        name: dto.name,
        artistId: dto.artistId ?? null,
        albumId: dto.albumId ?? null,
        duration: dto.duration,
      },
    });
  }

  async remove(id: string) {
    const exists = await this.prisma.track.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Track not found');

    await this.prisma.track.delete({ where: { id } });
  }

  async removeAlbumId(albumId: string) {
    await this.prisma.track.updateMany({
      where: { albumId },
      data: { albumId: null },
    });
  }

  async removeArtistId(artistId: string) {
    await this.prisma.track.updateMany({
      where: { artistId },
      data: { artistId: null },
    });
  }
}
