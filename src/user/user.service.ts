import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { randomUUID } from 'node:crypto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto): Promise<UserResponseDto> {
    if (!dto.login || !dto.password) {
      throw new BadRequestException(
        'Bad request. body does not contain required fields',
      );
    }

    const exists = await this.prisma.user.findUnique({
      where: { login: dto.login },
    });
    if (exists) {
      throw new ConflictException('Conflict. Login already exists');
    }

    const newUser = await this.prisma.user.create({
      data: {
        id: randomUUID(),
        login: dto.login,
        password: dto.password,
        version: 1,
      },
    });

    return new UserResponseDto({
      id: newUser.id,
      login: newUser.login,
      version: newUser.version,
      createdAt: Number(newUser.createdAt),
      updatedAt: Number(newUser.updatedAt),
    });
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.prisma.user.findMany();
    return users.map(
      (u) =>
        new UserResponseDto({
          id: u.id,
          login: u.login,
          version: u.version,
          createdAt: Number(u.createdAt),
          updatedAt: Number(u.updatedAt),
        }),
    );
  }

  async findOne(id: string): Promise<UserResponseDto> {
    if (!id) {
      throw new BadRequestException('User ID is required');
    }

    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return new UserResponseDto({
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: Number(user.createdAt),
      updatedAt: Number(user.updatedAt),
    });
  }

  async update(id: string, dto: UpdatePasswordDto): Promise<UserResponseDto> {
    if (!id) {
      throw new BadRequestException('User ID is required');
    }

    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.password !== dto.oldPassword) {
      throw new ForbiddenException('oldPassword is wrong');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        password: dto.newPassword,
        version: { increment: 1 },
        updatedAt: Math.floor(Date.now()),
      },
    });

    return new UserResponseDto({
      id: updatedUser.id,
      login: updatedUser.login,
      version: updatedUser.version,
      createdAt: Number(updatedUser.createdAt),
      updatedAt: Number(updatedUser.updatedAt),
    });
  }

  async remove(id: string): Promise<void> {
    if (!id) {
      throw new BadRequestException('User ID is required');
    }

    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.prisma.user.delete({ where: { id } });
  }
}
