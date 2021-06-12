import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { throwError } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';

import { Config } from './config.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class ConfigService {

  config!: Config;
  private readonly CONFIG_JSON_PATH = 'assets/config';

  constructor(private injector: Injector) { }

  load() {
    const http = this.injector.get(HttpClient);
    return http.get<Config>(`${this.CONFIG_JSON_PATH}/${environment.name}.json`).pipe(
      delay(3000), // Emulate really slow asset download
      tap(config => this.config = config), // Set public property
      // tap(config => console.log('CONFIG', config)), // Log to test that works
      // tap(() => environment.url = this.config.api), // Overwriting environment (be careful)
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error.message || 'CONFIG JSON NOT FOUND');
      })
    );
  }
}
