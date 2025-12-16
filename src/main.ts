import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { join } from 'path';
import * as YAML from 'yaml';
import { CustomLogger } from './logger/logger.service';
import { HttpExceptionFilter } from './logger/http-exception.filter';
import { LoggingInterceptor } from './logger/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const customLogger = new CustomLogger();
  app.useLogger(customLogger);

  app.useGlobalFilters(new HttpExceptionFilter(customLogger));

  app.useGlobalInterceptors(new LoggingInterceptor(customLogger));

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const config = app.get(ConfigService);
  const PORT = config.get('PORT') || 4000;

  // app.useGlobalPipes(new ValidationPipe());

  async function initSwagger(app: INestApplication) {
    const file = await readFile(join(__dirname, '../doc/api.yaml'), 'utf8');
    const document = YAML.parse(file);

    SwaggerModule.setup('doc', app, document);
  }
  app.enableCors();
  await initSwagger(app);
  await app.listen(PORT, '0.0.0.0');

  customLogger.log(`Server running at http://localhost:${PORT}`);
  customLogger.log(`Swagger is available at: http://localhost:${PORT}/doc`);
}
bootstrap();
