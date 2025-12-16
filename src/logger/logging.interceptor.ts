import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { CustomLogger } from './logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: CustomLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest();
    const { method, url, query, body } = request;
    const start = Date.now();

    this.logger.log(
      `Incoming request: ${method} ${url} - query: ${JSON.stringify(query)} - body: ${JSON.stringify(body)}`,
      'HTTP',
    );

    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();
        const duration = Date.now() - start;
        this.logger.log(
          `Response: ${method} ${url} - ${response.statusCode} - ${duration}ms`,
          'HTTP',
        );
      }),
    );
  }
}
