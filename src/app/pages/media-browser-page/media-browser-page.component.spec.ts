import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaBrowserPageComponent } from './media-browser-page.component';
import { MediaService } from 'app/core/services/media.service';
import { MediaStorageService } from 'app/core/services/media-storage.service';
import { Media } from 'app/shared/models/media';
import Medias from '../../../assets/data/medias';
import { of } from 'rxjs';
import { Component, Input, DebugElement, Directive } from '@angular/core';
import { By } from '@angular/platform-browser';

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

@Component({
  selector: 'app-billboard',
  template: '',
})
class MockedBillboardComponent {
  @Input() media: Media;
}

@Component({
  selector: 'app-media-slider',
  template: '',
})
export class MockedMediaSliderComponent {
  @Input() medias: Media[];
  @Input() listTitle: string;
  @Input() isOriginals: boolean;
}

describe('MediaBrowserPageComponent', () => {
  let component: MediaBrowserPageComponent;
  let fixture: ComponentFixture<MediaBrowserPageComponent>;
  let de: DebugElement;
  let mediaServiceSpy: Spied<MediaService>;
  let storageServiceSpy: Spied<MediaStorageService>;
  let MEDIAS: Media[];

  beforeEach(async(() => {
    MEDIAS = [...Medias];

    mediaServiceSpy = jasmine.createSpyObj('MediaService', [
      'getMedias',
      'getBillboardMedia',
      'getMediasOriginals',
    ]);

    storageServiceSpy = jasmine.createSpyObj('StorageService', [
      'getStoredMedias',
    ]);

    mediaServiceSpy.getBillboardMedia.and.returnValue(of(MEDIAS[0]));

    TestBed.configureTestingModule({
      declarations: [
        MediaBrowserPageComponent,
        MockedHeaderComponent,
        MockedBillboardComponent,
        MockedMediaSliderComponent,
      ],
      providers: [
        { provide: MediaService, useValue: mediaServiceSpy },
        { provide: MediaStorageService, useValue: storageServiceSpy },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaBrowserPageComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not show originals slider when not found the originals medias', () => {
    mediaServiceSpy.getMedias.and.returnValue(of(MEDIAS[0]));
    mediaServiceSpy.getMediasOriginals.and.returnValue(of(null));
    storageServiceSpy.getStoredMedias.and.returnValue(MEDIAS[0]);
    fixture.detectChanges();

    const mediasOriginals = de.query(By.css('#originals'));
    expect(mediasOriginals).toBeFalsy();
  });

  it('should show originals slider when not found the originals medias', () => {
    mediaServiceSpy.getMedias.and.returnValue(of(MEDIAS[0]));
    mediaServiceSpy.getMediasOriginals.and.returnValue(of(MEDIAS[0]));
    storageServiceSpy.getStoredMedias.and.returnValue(MEDIAS[0]);
    fixture.detectChanges();

    const mediasOriginals = de.query(By.css('#originals'));
    expect(mediasOriginals).toBeTruthy();
  });

  it('should not show myMedias slider when not found the stored medias', () => {
    mediaServiceSpy.getMedias.and.returnValue(of(MEDIAS[0]));
    mediaServiceSpy.getMediasOriginals.and.returnValue(of(MEDIAS[0]));
    storageServiceSpy.getStoredMedias.and.returnValue(null);
    fixture.detectChanges();

    const myMedias = de.query(By.css('#my-medias'));
    expect(myMedias).toBeFalsy();
  });

  it('should show myMedias slider when not found the stored medias', () => {
    mediaServiceSpy.getMedias.and.returnValue(of(MEDIAS[0]));
    mediaServiceSpy.getMediasOriginals.and.returnValue(of(MEDIAS[0]));
    storageServiceSpy.getStoredMedias.and.returnValue(MEDIAS[0]);
    fixture.detectChanges();

    const myMedias = de.query(By.css('#my-medias'));
    expect(myMedias).toBeFalsy();
  });

  it('should not show trending, releases and popular sliders when not found the medias', () => {
    mediaServiceSpy.getMedias.and.returnValue(of(null));
    mediaServiceSpy.getMediasOriginals.and.returnValue(of(MEDIAS[0]));
    storageServiceSpy.getStoredMedias.and.returnValue(MEDIAS[0]);
    fixture.detectChanges();

    const trending = de.query(By.css('#trending'));
    const releases = de.query(By.css('#releases'));
    const popular = de.query(By.css('#popular'));

    expect(trending).toBeFalsy();
    expect(releases).toBeFalsy();
    expect(popular).toBeFalsy();
  });

  it('should show trending, releases and popular sliders when get the medias', () => {
    mediaServiceSpy.getMedias.and.returnValue(of(MEDIAS[0]));
    mediaServiceSpy.getMediasOriginals.and.returnValue(of(MEDIAS[0]));
    storageServiceSpy.getStoredMedias.and.returnValue(MEDIAS[0]);
    fixture.detectChanges();

    const trending = de.query(By.css('#trending'));
    const releases = de.query(By.css('#releases'));
    const popular = de.query(By.css('#popular'));

    expect(trending).toBeTruthy();
    expect(releases).toBeTruthy();
    expect(popular).toBeTruthy();
  });
});
