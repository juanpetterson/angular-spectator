import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isAuthenticated = this.authService.isLoggedIn();
    const isLogin = next.data.isLogin;

    if (isLogin && isAuthenticated) {
      return this.router.createUrlTree(['/browse']);
    }

    if (isLogin && !isAuthenticated) {
      return true;
    }

    if (isAuthenticated) {
      return true;
    }

    this.authService.isAuthenticated$.next(null);

    return this.router.createUrlTree(['/']);
  }
}
