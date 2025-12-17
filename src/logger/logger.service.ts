import { ConsoleLogger, Injectable, LoggerService } from '@nestjs/common';
import { join } from 'path';
import { writeToFile } from './fileWriter';

@Injectable()
export class CustomLogger implements LoggerService {
  private readonly logFile = join(
    process.cwd(),
    process.env.INFO_LOG_FILE || 'logs/app.log',
  );

  private readonly errorFile = join(
    process.cwd(),
    process.env.ERROR_LOG_FILE || 'logs/errors.log',
  );

  private readonly consoleLogger = new ConsoleLogger();

  log(message: any, context?: string) {
    writeToFile(this.logFile, 'log', message, context);
    this.consoleLogger.log(message, context);
  }
  error(message: any, context?: string, trace?: string) {
    writeToFile(this.logFile, 'error', message, context, trace);
    writeToFile(this.errorFile, 'error', message, context, trace);
    this.consoleLogger.error(message, context, trace);
  }
  warn(message: any, context?: string) {
    writeToFile(this.logFile, 'warn', message, context);
    this.consoleLogger.warn(message, context);
  }
  debug?(message: any, context?: string) {
    writeToFile(this.logFile, 'debug', message, context);
    this.consoleLogger.debug(message, context);
  }
  verbose?(message: any, context?: string) {
    writeToFile(this.logFile, 'verbose', message, context);
    this.consoleLogger.verbose(message, context);
  }
  fatal?(message: any, context?: string, trace?: string) {
    writeToFile(this.logFile, 'fatal', message, context, trace);
    writeToFile(this.errorFile, 'fatal', message, context, trace);
    this.consoleLogger.fatal(message, context);
  }
}
