import { LogLevel } from '@nestjs/common';
import { appendFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

export function writeToFile(
  filePath: string,
  level: LogLevel,
  message: any,
  context?: string,
  trace?: string,
) {
  const time = new Date().toISOString();
  const formattedTime = time.replace('T', ' ');
  const log = `[${formattedTime}] [${level}]${context ? ` [${context}]` : ''} ${message}${trace ? `\nTRACE: ${trace}` : ''}\n`;

  const dir = dirname(filePath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  appendFileSync(filePath, log);
}
