import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { User } from 'app/shared/models/user';
import Users from '../../../assets/data/users';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;
  let routeStateMock: any;
  let routeMock: any;
  let router: Router;
  let USER: User;

  beforeEach(() => {
    USER = [...Users][0];
    routeStateMock = {};

    TestBed.configureTestingModule({
      providers: [AuthGuard],
      imports: [RouterTestingModule],
    });

    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should redirect an unauthenticated user to the login route', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(false);
    routeMock = { data: { isLogin: false } };

    expect(guard.canActivate(routeMock, routeStateMock)).toEqual(
      router.createUrlTree(['/'])
    );
  });

  it('should not redirect an authenticated user', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(true);
    routeMock = { data: { isLogin: false } };

    expect(guard.canActivate(routeMock, routeStateMock)).toEqual(true);
  });

  it('should redirect an authenticated user to the browse page if access the login route', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(true);
    routeMock = { data: { isLogin: true } };

    expect(guard.canActivate(routeMock, routeStateMock)).toEqual(
      router.createUrlTree(['/browse'])
    );
  });
});
