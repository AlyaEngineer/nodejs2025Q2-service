import { randomUUID } from 'crypto';

export class TrackEntity {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;

  constructor(props: {
    id: string;
    name: string;
    artistId: string | null;
    albumId: string | null;
    duration: number;
  }) {
    this.id = props.id;
    this.name = props.name;
    this.artistId = props.artistId;
    this.albumId = props.albumId;
    this.duration = props.duration;
  }

  static create(
    name: string,
    artistId: string | null,
    albumId: string | null,
    duration: number,
  ) {
    return new TrackEntity({
      id: randomUUID(),
      name,
      artistId,
      albumId,
      duration,
    });
  }

  update(props: {
    name: string;
    artistId: string | null;
    albumId: string | null;
    duration: number;
  }) {
    this.name = props.name;
    this.artistId = props.artistId;
    this.albumId = props.albumId;
    this.duration = props.duration;
  }
}
