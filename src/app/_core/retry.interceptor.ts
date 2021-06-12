import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, retryWhen, mergeMap } from 'rxjs/operators';

@Injectable()
export class RetryInterceptor implements HttpInterceptor {

  private readonly ATTEMPTS = 3;

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      // retry(this.ATTEMPTS), // For simple retry right away
      retryWhen(errors => errors.pipe(
        delay(1000),
        mergeMap((error, index) => (index >= this.ATTEMPTS) ? throwError(error) : of(error))
      )),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // refresh token, redirect login...
          // return EMPTY; // Might not want to handle this on global error...
          return throwError(error);
        }
        // Handle this on global error handler
        return throwError(error);
      })
    );
  }
}
