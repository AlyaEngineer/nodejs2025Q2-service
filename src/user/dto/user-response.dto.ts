export class UserResponseDto {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  constructor(entity: {
    id: string;
    login: string;
    version: number;
    createdAt: number;
    updatedAt: number;
  }) {
    this.id = entity.id;
    this.login = entity.login;
    this.version = entity.version;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
  }
}
