import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Media } from '../../shared/models/media';
import medias from '../../../assets/data/medias';

@Injectable({ providedIn: 'root' })
export class MediaService {
  public constructor() {}

  public getMedias(): Observable<Media[]> {
    return of(medias.sort(() => Math.random() - 0.5));
  }

  public getMedia(id: number): Observable<Media> {
    return of(medias.find((media) => media.id === id));
  }

  public getMediasOriginals(): Observable<Media[]> {
    return of(medias.filter((media) => media.originals));
  }

  public getBillboardMedia(): Observable<Media> {
    return of(medias[Math.floor(Math.random() * medias.length)]);
  }
}
