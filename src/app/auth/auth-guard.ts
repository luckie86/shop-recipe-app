import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, UrlTree, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
        return this.authService.user.pipe(
            take(1), // take the latest value and then unsubscribe (no ongoing subscription)
            map(user => {
                const isAuthenticated = !!user; // converts truish (object) value to true,
                // converts a falsih value(null or undefined) to false boolean
                if (isAuthenticated) {
                    return true;
                } else {
                    return this.router.createUrlTree(['/auth']);
                }
        }));
    }

}
