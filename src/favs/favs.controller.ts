import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavResponseDto } from './dto/fav-response.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Favorites')
@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<FavResponseDto> {
    return this.favsService.findAll();
  }
  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  async addTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.addTrack(id);
  }
  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.favsService.removeTrack(id);
  }
  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  async addAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.addAlbum(id);
  }
  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.favsService.removeAlbum(id);
  }
  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  async addArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.addArtist(id);
  }
  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.favsService.removeArtist(id);
  }
}
