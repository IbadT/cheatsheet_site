import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

@Catch()
export class HandleExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(HandleExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = exception instanceof QueryFailedError
      ? exception.message
      : (exception as any).message || null;

    const errorResponse = {
      path: request.url,
      timestamp: new Date().toISOString(),
      message: message
    };

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(
        `Internal server error: ${message}`,
        (exception as any).stack,
      );
    } else {
      this.logger.warn(
        `Client error: ${message}`,
        (exception as any).stack,
      );
    }

    response.status(status).json(errorResponse);
  }
}
