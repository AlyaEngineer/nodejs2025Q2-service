import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';

@Injectable()
export class TrackService {
  public tracks: TrackEntity[] = [];

  create(dto: CreateTrackDto) {
    const track = TrackEntity.create(
      dto.name,
      dto.artistId,
      dto.albumId,
      dto.duration,
    );
    this.tracks.push(track);
    return track;
  }

  findAll() {
    return this.tracks;
  }

  findOne(id: string) {
    const track = this.tracks.find((t) => t.id === id);
    if (!track) {
      throw new NotFoundException('Track was not found');
    }
    return track;
  }

  update(id: string, dto: UpdateTrackDto) {
    const track = this.tracks.find((t) => t.id === id);
    if (!track) {
      throw new NotFoundException('Track was not found');
    }

    track.update({
      name: dto.name,
      artistId: dto.artistId,
      albumId: dto.albumId,
      duration: dto.duration,
    });
    return track;
  }

  remove(id: string) {
    const index = this.tracks.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new NotFoundException('Track was not found');
    }

    this.tracks.splice(index, 1);
  }
}
