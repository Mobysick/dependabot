import { BadRequestException } from '@nestjs/common';
import { ApiErrorMessage } from '../api-error-message';

export class BadRequestError extends BadRequestException {
  constructor(message?: ApiErrorMessage) {
    const errorMessage = message || ApiErrorMessage.BAD_REQUEST;
    super(errorMessage, ApiErrorMessage.BAD_REQUEST);
  }
}
