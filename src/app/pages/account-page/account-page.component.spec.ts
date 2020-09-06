import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPageComponent } from './account-page.component';
import { User } from 'app/shared/models/user';
import { AuthService } from 'app/core/services/auth.service';
import { MediaStorageService } from 'app/core/services/media-storage.service';
import { DebugElement, Component, Input } from '@angular/core';
import { of } from 'rxjs';
import { Media } from 'app/shared/models/media';
import { By } from '@angular/platform-browser';
import Users from '../../../assets/data/users';
import Medias from '../../../assets/data/medias';

export type Spied<T> = {
  [Method in keyof T]: jasmine.Spy;
};

@Component({
  selector: 'app-header',
  template: '',
})
class MockedHeaderComponent {
  @Input() backgroundColor = 'transparent';
  @Input() showNavigation = true;
}

describe('AccountPageComponent', () => {
  let component: AccountPageComponent;
  let fixture: ComponentFixture<AccountPageComponent>;
  let storageServiceSpy: Spied<MediaStorageService>;
  let de: DebugElement;
  let USER: User;
  let MEDIAS: Media[];

  beforeEach(async(() => {
    USER = [...Users][0];
    MEDIAS = [...Medias];

    storageServiceSpy = jasmine.createSpyObj('StorageService', [
      'getStoredMedias',
    ]);

    const authService = {
      isAuthenticated$: of(USER),
    };

    TestBed.configureTestingModule({
      declarations: [AccountPageComponent, MockedHeaderComponent],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: MediaStorageService, useValue: storageServiceSpy },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPageComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
  });

  it('should create', () => {
    storageServiceSpy.getStoredMedias.and.returnValue([]);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should not show the last watched medias by the user', () => {
    storageServiceSpy.getStoredMedias.and.returnValue([]);
    fixture.detectChanges();

    const lastWatched = de.query(By.css('#last-watched'));

    expect(lastWatched).toBeFalsy();
  });

  it('should show the field with user email', () => {
    storageServiceSpy.getStoredMedias.and.returnValue([]);
    fixture.detectChanges();

    const userEmailField = de.query(By.css('#user-email'));

    expect(userEmailField).toBeTruthy();
  });

  it('should show the last watched medias by the user', () => {
    storageServiceSpy.getStoredMedias.and.returnValue(MEDIAS.slice(0, 5));
    fixture.detectChanges();

    const lastWatched = de.query(By.css('#last-watched'));

    expect(lastWatched).toBeTruthy();
  });
});
