import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { join } from 'path';
import * as YAML from 'yaml';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const PORT = config.get('PORT');

  app.useGlobalPipes(new ValidationPipe());

  async function initSwagger(app: INestApplication) {
    const file = await readFile(join(__dirname, '../doc/api.yaml'), 'utf8');
    const document = YAML.parse(file);

    SwaggerModule.setup('doc', app, document);
  }

  await initSwagger(app);
  await app.listen(PORT);

  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Swagger is available at: http://localhost:${PORT}/doc`);
}
bootstrap();
