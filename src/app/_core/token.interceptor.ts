import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs';

import { NO_APY_KEY } from './http.context';

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = '<API-KEY-HERE>'; // from localStorage, from httpRequest, from...

        if (request.context.get(NO_APY_KEY)) {
            return next.handle(request);
        }

        const requestApiKey = request.clone({
            setHeaders: { 'x-api-key': token }
        });
        return next.handle(requestApiKey);
    }
}
