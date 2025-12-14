import { LogLevel } from '@nestjs/common';
import {
  appendFileSync,
  existsSync,
  mkdirSync,
  statSync,
  renameSync,
} from 'node:fs';
import { dirname } from 'node:path';
import { shouldLog } from './logLevels';

const MAX_SIZE_KB = Number(process.env.LOG_MAX_SIZE_KB) || 1;

function rotateFile(filePath: string) {
  const dir = dirname(filePath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  if (!existsSync(filePath)) return;

  const stats = statSync(filePath);
  if (stats.size >= MAX_SIZE_KB * 1024) {
    const timestamp = new Date()
      .toISOString()
      .replace('T', '_')
      .replace(/[:.]/g, '-');
    const rotated = `${filePath}.${timestamp}`;
    renameSync(filePath, rotated);
  }
}

export function writeToFile(
  filePath: string,
  level: LogLevel,
  message: any,
  context?: string,
  trace?: string,
) {
  if (!shouldLog(level)) return;

  rotateFile(filePath);

  const time = new Date().toISOString();
  const formattedTime = time.replace('T', ' ');
  const log = `[${formattedTime}] [${level}]${context ? ` [${context}]` : ''} ${message}${trace ? `\nTRACE: ${trace}` : ''}\n`;

  const dir = dirname(filePath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  appendFileSync(filePath, log);
}
