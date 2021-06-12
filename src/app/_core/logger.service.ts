import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  log(error: any) {
    console.warn('[LOGGER]:', error);
  }

  logHttpErrorMessage(error: HttpErrorResponse) {
    console.warn('[LOGGER]:', error.message);
  }

  logErrorStack(error: Error) {
    console.warn('[LOGGER]:', error.message, error.stack);
  }
}
