import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserEntity } from './entities/user.entity';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UserService {
  private users: UserEntity[] = [];

  create(dto: CreateUserDto): UserResponseDto {
    if (!dto.login || !dto.password) {
      throw new BadRequestException(
        'Bad request. body does not contain required fields',
      );
    }

    const exists = this.users.find((u) => u.login === dto.login);
    if (exists) {
      throw new ConflictException('Conflict. Login already exists');
    }

    const newUser = UserEntity.create(dto.login, dto.password);
    this.users.push(newUser);

    return new UserResponseDto(newUser);
  }

  findAll(): UserResponseDto[] {
    return this.users.map((u) => new UserResponseDto(u));
  }

  findOne(id: string): UserResponseDto {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return new UserResponseDto(user);
  }

  update(id: string, dto: UpdatePasswordDto): UserResponseDto {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.password !== dto.oldPassword) {
      throw new ForbiddenException('oldPassword is wrong');
    }

    user.updatePassword(dto.newPassword);
    return new UserResponseDto(user);
  }

  remove(id: string): void {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) {
      throw new NotFoundException('User not found');
    }
    this.users.splice(index, 1);
  }
}
