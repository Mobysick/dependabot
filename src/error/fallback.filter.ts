import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ApiErrorMessage } from './api-error-message';

@Catch()
export class FallbackExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    console.log(
      ApiErrorMessage.INTERNAL_SERVER_ERROR,
      exception.name,
      exception.message,
      FallbackExceptionFilter.name,
      exception.stack,
    );

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.status(500).json({
      statusCode: 500,
      message: ApiErrorMessage.INTERNAL_SERVER_ERROR,
    });
  }
}
