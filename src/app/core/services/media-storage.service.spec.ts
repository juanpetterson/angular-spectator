import { TestBed } from '@angular/core/testing';

import { MediaStorageService } from './media-storage.service';
import { MediaService } from './media.service';
import { User } from 'app/shared/models/user';
import { AuthService } from './auth.service';
import Users from '../../../assets/data/users';
import { StoredMedia } from 'app/shared/models/stored-media';

export type Spied<T> = {
  [Method in keyof T]: jasmine.Spy;
};

describe('MediaStorageService', () => {
  let service: MediaStorageService;
  let authServiceSpy: any;
  let mediaServiceSpy: Spied<MediaService>;
  let USER: User;
  let STORED: StoredMedia[];

  beforeEach(() => {
    USER = [...Users][0];
    STORED = [
      { id: 0, currentTime: 0, updatedAt: 0 },
      { id: 1, currentTime: 0, updatedAt: 0 },
      { id: 2, currentTime: 0, updatedAt: 0 },
      { id: 3, currentTime: 0, updatedAt: 0 },
      { id: 4, currentTime: 0, updatedAt: 0 },
    ];

    authServiceSpy = {
      isAuthenticated$: { value: USER },
    };

    mediaServiceSpy = jasmine.createSpyObj('MediaService', ['getMedia']);

    TestBed.configureTestingModule({
      providers: [{ provide: AuthService, useValue: authServiceSpy }],
    });
    service = TestBed.inject(MediaStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get stored medias when getStoredMedias is called', () => {
    spyOn(service.store, 'get').and.returnValue(STORED);

    const storedMedias = service.getStoredMedias();

    expect(storedMedias.length).toEqual(STORED.length);
  });

  it('should get X stored medias when getStoredMedias with value is called', () => {
    spyOn(service.store, 'get').and.returnValue(STORED);

    const storedMedias = service.getStoredMedias(2);

    expect(storedMedias.length).toEqual(2);
  });

  it('should update stored media when updateStoredMedia is called', () => {
    spyOn(service.store, 'get').and.returnValue(STORED);
    const setStore = spyOn(service.store, 'set');

    const media = { id: 0, currentTime: 0, updatedAt: 0 };

    service.updateStoredMedia(media.id, media.currentTime);

    expect(setStore).toHaveBeenCalled();
  });
});
