import { Spectator, createRoutingFactory } from '@ngneat/spectator';

import { LoginPageComponent } from './login-page.component';
import { AuthService } from 'app/core/services/auth.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

fdescribe('LoginPageComponent', () => {
  const errorMessage = 'Error';
  let spectator: Spectator<LoginPageComponent>;
  const createComponent = createRoutingFactory({
    component: LoginPageComponent,
    imports: [RouterTestingModule],
    mocks: [AuthService],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    const component = spectator.component;
    expect(component).toBeTruthy();
  });

  it('should have sign in button', () => {
    const signInButton = spectator.query('#sign-in');
    expect(signInButton).toHaveText('Sign In');
  });

  it('should have the login-form__button class', () => {
    const signInButton = spectator.query('#sign-in');
    expect(signInButton).toHaveClass('login-form__button');
  });

  it('should form be invalid when empty', () => {
    expect(spectator.component.email.valid).toBeFalsy();
  });

  it('should validate inputs as required', () => {
    const component = spectator.component;
    const email = component.form.controls.email;
    const password = component.form.controls.password;

    expect(email.valid).toBeFalsy();
    expect(email.errors.required).toBeTruthy();

    expect(password.valid).toBeFalsy();
    expect(password.errors.required).toBeTruthy();
  });

  it('should appear error message if throw an error when submit', () => {
    const component = spectator.component;
    const authService = spectator.inject(AuthService);
    authService.signIn.and.returnValue(throwError({ message: errorMessage }));

    component.form.controls.email.setValue('my@email.com');
    component.form.controls.password.setValue('123456');
    expect(component.form.valid).toBeTruthy();

    component.onSubmit();
    spectator.detectChanges();

    expect(component.errorMessage).toBe(errorMessage);

    const errorBox = spectator.query('.error-box');
    expect(errorBox).toBeTruthy();
  });

  it('should invoke auth service when form is valid and navigate', async () => {
    const component = spectator.component;
    const router = spectator.inject(Router);
    const authService = spectator.inject(AuthService);

    const email = component.form.controls.email;
    email.setValue('my@email.com');
    const password = component.form.controls.password;
    password.setValue('123456');
    authService.signIn.and.returnValue(of('user'));

    spectator.component.onSubmit();

    expect(authService.signIn.calls.all().length).toEqual(1);
    expect(router.navigate).toHaveBeenCalled();
  });
});
