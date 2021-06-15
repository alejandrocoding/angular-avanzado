import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TokenGuard implements CanActivate, CanLoad {

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        // The canActivate Guard prevents unauthorized user from accessing the route (but module is downloaded)
        console.log('ENTERING CAN ACTIVATE GUARD');
        return false;
    }

    canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        // The CanLoad Guard prevents the loading of the Lazy Loaded Module
        console.log('ENTERING CAN LOAD GUARD');
        return false;
    }
}
