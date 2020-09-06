import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import users from '../../../assets/data/users';
import { User } from '../../shared/models/user';
import { Storage } from '../store';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuthenticated$ = new BehaviorSubject<User>(null);
  private store = new Storage('@netflix');

  constructor(private router: Router) {}

  public signIn(username: string, password: string): Observable<User> {
    return new Observable((subscriber) => {
      const foundUser = users.find((user) => user.email === username);

      if (!foundUser) {
        throw new Error(
          `Sorry, we can't find an account with this email address. Please try again.`
        );
      }

      if (foundUser.password !== password) {
        throw new Error('Incorrect password. Please try again.');
      }

      this.handleAuthentication(foundUser);

      subscriber.next(foundUser);
    });
  }

  public autoLogin(): void {
    const user = this.store.get('user');

    if (user) {
      this.handleAuthentication(user);
    }
  }

  public logout(): void {
    this.store.remove('user');
    this.handleAuthentication(null);
    this.router.navigate(['/']);
  }

  public isLoggedIn(): boolean {
    const storedUser = this.store.get('user');
    const isAuthenticated = this.isAuthenticated$.value;

    return !!storedUser && !!isAuthenticated;
  }

  private handleAuthentication(user: User) {
    this.isAuthenticated$.next(user);
    if (user) {
      this.store.set('user', user);
    } else {
      this.store.remove('user');
    }
  }
}
