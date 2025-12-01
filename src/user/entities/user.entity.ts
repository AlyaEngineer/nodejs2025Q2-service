import { randomUUID } from 'crypto';

export class UserEntity {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  constructor(props: {
    id: string;
    login: string;
    password: string;
    version: number;
    createdAt: number;
    updatedAt: number;
  }) {
    this.id = props.id;
    this.login = props.login;
    this.password = props.password;
    this.version = props.version;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static create(login: string, password: string) {
    const now = Date.now();
    return new UserEntity({
      id: randomUUID(),
      login,
      password,
      version: 1,
      createdAt: now,
      updatedAt: now,
    });
  }

  updatePassword(newPassword: string) {
    this.password = newPassword;
    this.version += 1;
    this.updatedAt = Date.now();
  }
}
