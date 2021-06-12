import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { LoggerService } from './logger.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private readonly injector: Injector) { }

  handleError(error: Error | HttpErrorResponse) {

    // Error handling must load first so we manually inject the services with Injector
    const logger = this.injector.get(LoggerService);

    if (error instanceof HttpErrorResponse) {
      // Server Error
      logger.logHttpErrorMessage(error);
    } else {
      // Client Error
      logger.logErrorStack(error);
    }

    // Also show on the APP console...
    console.warn('ERROR:', error);
  }
}
