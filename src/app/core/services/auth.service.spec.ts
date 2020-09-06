import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Storage } from '../store';
import { User } from 'app/shared/models/user';
import Users from '../../../assets/data/users';

describe('AuthService', () => {
  let router: Router;
  let service: AuthService;
  let store: Storage;
  let USER: User;

  beforeEach(() => {
    USER = [...Users][0];
    store = new Storage('@netflix');

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    });

    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should throw an Error when signIn is called and the user is not found', () => {
    spyOn(service, 'signIn');

    const signIn = service.signIn('email', 'password');

    expect(() => {
      signIn.subscribe();
    }).toThrow();
  });

  it('should store the user at localStorage and isAuthenticated$ update when signIn is called with the correct credentials', (done) => {
    const isAuthenticated$ = spyOn(service.isAuthenticated$, 'next');

    service.signIn(USER.email, USER.password).subscribe((user: User) => {
      const storedUser = store.get('user');

      expect(isAuthenticated$).toHaveBeenCalledWith(USER);
      expect(storedUser).toBeTruthy();
      expect(user).toEqual(USER);

      done();
    });
  });

  it('should redirect to the login page, isAuthenticated$ update and remove from localStorage when Logout is called', () => {
    const navigate = spyOn(router, 'navigate');
    const isAuthenticated$ = spyOn(service.isAuthenticated$, 'next');

    service.logout();

    const storedUser = store.get('user');

    expect(navigate).toHaveBeenCalledWith(['/']);
    expect(isAuthenticated$).toHaveBeenCalledWith(null);
    expect(storedUser).toBeFalsy();
  });
});
