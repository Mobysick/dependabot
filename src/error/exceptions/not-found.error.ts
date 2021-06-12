import { NotFoundException } from '@nestjs/common';
import { ApiErrorMessage } from '../api-error-message';

export class NotFoundError extends NotFoundException {
  constructor(message?: ApiErrorMessage) {
    const errorMessage = message || ApiErrorMessage.NOT_FOUND;
    super(errorMessage, ApiErrorMessage.NOT_FOUND);
  }
}
