import { Injectable } from '@angular/core';
import { MediaService } from '../../core/services/media.service';
import { Media } from '../../shared/models/media';
import { StoredMedia } from '../../shared/models/stored-media';
import { Storage } from '../store';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class MediaStorageService {
  store = new Storage('@netflix');

  constructor(
    private mediaService: MediaService,
    private authService: AuthService
  ) {}

  public getStoredMedias(lastMediasCount: number = 0): Media[] {
    const loggedUser = this.authService.isAuthenticated$.value;
    const userMedias = this.store.get(loggedUser.email) || [];

    let storedMedias = userMedias
      .sort((m1: StoredMedia, m2: StoredMedia) => {
        return m2.updatedAt - m1.updatedAt;
      })
      .map((media) => {
        let storedMedia: Media;

        this.mediaService.getMedia(media.id).subscribe((resMedia) => {
          storedMedia = resMedia;
        });

        return storedMedia;
      });

    if (lastMediasCount) {
      storedMedias = storedMedias.slice(0, lastMediasCount);
    }

    return storedMedias;
  }

  public getStoredMedia(id: number): StoredMedia {
    const loggedUser = this.authService.isAuthenticated$.value;
    const userMedias = this.store.get(loggedUser.email) || [];

    const storedMedia = userMedias.find((media) => {
      return media.id === id;
    });

    return storedMedia;
  }

  public updateStoredMedia(id: number, currentTime: number): void {
    const loggedUser = this.authService.isAuthenticated$.value;
    const userMedias = this.store.get(loggedUser.email) || [];

    const storedMedia: StoredMedia = userMedias.find((media: StoredMedia) => {
      return media.id === id;
    });

    if (storedMedia) {
      storedMedia.currentTime = currentTime;
      storedMedia.updatedAt = new Date().getTime();
    } else {
      const userMedia: StoredMedia = {
        id,
        currentTime,
        updatedAt: new Date().getTime(),
      };
      userMedias.push(userMedia);
    }
    this.store.set(loggedUser.email, userMedias);
  }
}
