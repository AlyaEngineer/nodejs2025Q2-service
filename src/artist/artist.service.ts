import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateArtistDto) {
    const artist = await this.prisma.artist.create({
      data: {
        name: dto.name,
        grammy: dto.grammy,
      },
    });
    return artist;
  }

  async findAll() {
    return this.prisma.artist.findMany();
  }

  async findOne(id: string) {
    const artist = await this.prisma.artist.findUnique({
      where: { id },
    });
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  async update(id: string, dto: UpdateArtistDto) {
    const exists = await this.prisma.artist.findUnique({ where: { id } });
    if (!exists) {
      throw new NotFoundException('Artist not found');
    }

    return this.prisma.artist.update({
      where: { id },
      data: {
        name: dto.name,
        grammy: dto.grammy,
      },
    });
  }

  async remove(id: string) {
    const exists = await this.prisma.artist.findUnique({ where: { id } });
    if (!exists) {
      throw new NotFoundException('Artist not found');
    }

    await this.prisma.artist.delete({ where: { id } });

    await this.prisma.album.updateMany({
      where: { artistId: id },
      data: { artistId: null },
    });

    await this.prisma.track.updateMany({
      where: { artistId: id },
      data: { artistId: null },
    });
  }
}
