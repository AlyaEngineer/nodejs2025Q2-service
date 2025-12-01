import { randomUUID } from 'crypto';

export class ArtistEntity {
  id: string;
  name: string;
  grammy: boolean;

  constructor(props: { id: string; name: string; grammy: boolean }) {
    this.id = props.id;
    this.name = props.name;
    this.grammy = props.grammy;
  }

  static create(name: string, grammy: boolean) {
    return new ArtistEntity({
      id: randomUUID(),
      name,
      grammy,
    });
  }

  update(props: { name: string; grammy: boolean }) {
    this.name = props.name;
    this.grammy = props.grammy;
  }
}
