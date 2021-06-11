import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = '<API-KEY-HERE>'; // from localStorage, from httpRequest, from...

        const requestApiKey = request.clone({
            setHeaders: { 'x-api-key': token }
        });
        return next.handle(requestApiKey);
    }
}
