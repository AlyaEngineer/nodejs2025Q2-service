import { LogLevel } from '@nestjs/common';

export const NEST_LOG_LEVELS: LogLevel[] = [
  'log',
  'fatal',
  'error',
  'warn',
  'debug',
  'verbose',
];

export function getCurrentLogLevelIndex(): number {
  const envLevel = Number(process.env.LOG_LEVEL ?? 2);
  return Math.min(Math.max(envLevel, 0), NEST_LOG_LEVELS.length - 1);
}

export function shouldLog(level: LogLevel): boolean {
  const levelIndex = NEST_LOG_LEVELS.indexOf(level);
  return levelIndex <= getCurrentLogLevelIndex();
}
