import {
  Injectable,
  BadRequestException,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private accessSecret: string;
  private refreshSecret: string;
  private accessExpire: string;
  private refreshExpire: string;
  private saltRounds: number;

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {
    this.accessSecret = this.configService.get<string>('JWT_SECRET')!;
    this.refreshSecret = this.configService.get<string>(
      'JWT_SECRET_REFRESH_KEY',
    )!;
    this.accessExpire =
      this.configService.get<string>('ACCESS_TOKEN_TTL') || '1h';
    this.refreshExpire =
      this.configService.get<string>('REFRESH_TOKEN_TTL') || '24h';
    this.saltRounds =
      Number(this.configService.get<number>('CRYPT_SALT')) || 10;
  }

  async signup(dto: SignupDto) {
    if (!dto.login || !dto.password)
      throw new BadRequestException('Login and password required');

    const exists = await this.prisma.user.findUnique({
      where: { login: dto.login },
    });
    if (exists) throw new ForbiddenException('User already exists');

    const hashedPassword = await bcrypt.hash(dto.password, this.saltRounds);
    const user = await this.prisma.user.create({
      data: { login: dto.login, password: hashedPassword, version: 1 },
    });

    return {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: Number(user.createdAt),
      updatedAt: Number(user.updatedAt),
    };
  }

  async login(dto: LoginDto) {
    if (!dto.login || !dto.password)
      throw new BadRequestException('Login and password required');

    const user = await this.prisma.user.findUnique({
      where: { login: dto.login },
    });
    if (!user) throw new ForbiddenException('Invalid credentials');

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) throw new ForbiddenException('Invalid credentials');

    const payload = { userId: user.id, login: user.login };
    const accessToken = jwt.sign(payload, this.accessSecret, {
      expiresIn: this.accessExpire,
    });
    const refreshToken = jwt.sign(payload, this.refreshSecret, {
      expiresIn: this.refreshExpire,
    });

    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    return { accessToken, refreshToken };
  }

  async refresh(refreshToken?: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token required');
    }

    let payload: { userId: string; login: string };
    try {
      payload = jwt.verify(refreshToken, this.refreshSecret) as {
        userId: string;
        login: string;
      };
    } catch (err) {
      throw new ForbiddenException('Invalid or expired refresh token');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: payload.userId },
    });
    if (!user || user.refreshToken !== refreshToken) {
      throw new ForbiddenException('Invalid refresh token');
    }

    const newPayload = { userId: user.id, login: user.login };
    const accessToken = jwt.sign(newPayload, this.accessSecret, {
      expiresIn: this.accessExpire,
    });
    const newRefreshToken = jwt.sign(newPayload, this.refreshSecret, {
      expiresIn: this.refreshExpire,
    });

    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: newRefreshToken },
    });

    return { accessToken, refreshToken: newRefreshToken };
  }
}
