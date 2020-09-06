import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchPlayerComponent } from './watch-player.component';
import { DebugElement, Component, Input } from '@angular/core';
import { MediaService } from 'app/core/services/media.service';
import { Media } from 'app/shared/models/media';
import Medias from '../../../assets/data/medias';
import { MediaStateService } from './services/media-state.service';
import { MediaStorageService } from 'app/core/services/media-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

export type Spied<T> = {
  [Method in keyof T]: jasmine.Spy;
};

@Component({
  selector: 'app-watch-player-controls',
  template: '',
})
class MockedWatchPlayerControlsComponent {
  @Input() media: Media;
}

describe('WatchPlayerComponent', () => {
  let component: WatchPlayerComponent;
  let fixture: ComponentFixture<WatchPlayerComponent>;
  let de: DebugElement;
  let mediaServiceSpy: Spied<MediaService>;
  let storageServiceSpy: Spied<MediaStorageService>;
  let mediaStateService: MediaStateService;
  let MEDIAS: Media[];
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(async(() => {
    MEDIAS = [...Medias];

    mediaServiceSpy = jasmine.createSpyObj('MediaService', ['getMedia']);
    storageServiceSpy = jasmine.createSpyObj('StorageService', [
      'getStoredMedia',
      'updateStoredMedia',
    ]);

    mediaServiceSpy.getMedia.and.returnValue(of(MEDIAS[0]));
    storageServiceSpy.getStoredMedia.and.returnValue(null);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [WatchPlayerComponent, MockedWatchPlayerControlsComponent],
      providers: [
        { provide: MediaService, useValue: mediaServiceSpy },
        { provide: MediaStorageService, useValue: storageServiceSpy },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    mediaStateService = TestBed.inject(MediaStateService);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);

    fixture = TestBed.createComponent(WatchPlayerComponent);
    component = fixture.componentInstance;
    component.loading = false;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initiate the player paused ', () => {
    const player = de.query(By.css('#player'))
      .nativeElement as HTMLVideoElement;

    expect(player.paused).toBeTruthy();
  });

  it('should toggle fullscreen when dobule click on the video', () => {
    const componentSpy = spyOn(component, 'onToggleFullscreen');
    const player = de.query(By.css('#player'));

    player.triggerEventHandler('dblclick', new MouseEvent('dblclick'));

    expect(componentSpy).toHaveBeenCalled();
  });

  it('should call onMediaStateChange when mediaStateEvent from MediaStateService emit', () => {
    const componentSpy = spyOn(component, 'onMediaStateChange');
    mediaStateService.mediaStateEvent.next(null);

    expect(componentSpy).toHaveBeenCalled();
  });

  it('should retrieve the stored media', () => {
    expect(storageServiceSpy.getStoredMedia).toHaveBeenCalled();
  });

  it('should call updateStoredMedia when player timeupdate change', () => {
    const player = de.query(By.css('#player')).nativeElement as HTMLElement;

    const timeUpdateEvent = new Event('timeupdate', {});

    player.dispatchEvent(timeUpdateEvent);

    expect(storageServiceSpy.updateStoredMedia).toHaveBeenCalled();
  });

  it('should the progress be 100 when media ended', () => {
    const player = de.query(By.css('#player')).nativeElement as HTMLElement;

    const endedEvent = new Event('ended', {});

    player.dispatchEvent(endedEvent);

    expect(component.progress).toEqual(100);
  });

  it('should stop show loading when player canplay event is emitted', () => {
    const player = de.query(By.css('#player')).nativeElement as HTMLElement;

    const canPlayEvent = new Event('canplay', {});

    player.dispatchEvent(canPlayEvent);

    expect(component.loading).toBeFalsy();
  });

  it('should call onMouseStop when move the mouse', () => {
    const componentSpy = spyOn(component, 'onMouseStop');
    const mouseMoveEvent = new Event('mousemove', {});

    window.dispatchEvent(mouseMoveEvent);

    expect(componentSpy).toHaveBeenCalled();
  });

  it('should call onMouseStop when click on the window', () => {
    const componentSpy = spyOn(component, 'onMouseStop');
    const mouseDownEvent = new Event('mousedown', {});

    window.dispatchEvent(mouseDownEvent);

    expect(componentSpy).toHaveBeenCalled();
  });
});
