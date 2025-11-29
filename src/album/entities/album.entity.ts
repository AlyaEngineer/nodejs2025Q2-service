import { randomUUID } from 'crypto';

export class AlbumEntity {
  id: string;
  name: string;
  year: number;
  artistId: string | null;

  constructor(props: {
    id: string;
    name: string;
    year: number;
    artistId: string | null;
  }) {
    this.id = props.id;
    this.name = props.name;
    this.year = props.year;
    this.artistId = props.artistId;
  }

  static create(name: string, year: number, artistId: string | null) {
    return new AlbumEntity({
      id: randomUUID(),
      name,
      year,
      artistId,
    });
  }

  update(props: { name: string; year: number; artistId?: string | null }) {
    this.name = props.name;
    this.year = props.year;
    this.artistId = props.artistId;
  }

  removeArtistId(artistId: string) {
    if (this.artistId === artistId) {
      this.artistId = null;
    }
  }
}
