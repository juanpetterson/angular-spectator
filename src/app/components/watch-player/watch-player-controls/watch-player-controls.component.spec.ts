import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchPlayerControlsComponent } from './watch-player-controls.component';
import { DebugElement } from '@angular/core';
import { MediaStateService } from '../services/media-state.service';
import { By } from '@angular/platform-browser';

describe('WatchPlayerControlsComponent', () => {
  let component: WatchPlayerControlsComponent;
  let fixture: ComponentFixture<WatchPlayerControlsComponent>;
  let de: DebugElement;
  let mediaStateService: MediaStateService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WatchPlayerControlsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    mediaStateService = TestBed.inject(MediaStateService);

    fixture = TestBed.createComponent(WatchPlayerControlsComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should execute service play when play button was clicked', () => {
    const play = spyOn(mediaStateService, 'play');

    const button = de.query(By.css('#play'));
    button.nativeElement.click();

    expect(play).toHaveBeenCalled();
  });

  it('should execute service pause when pause button was clicked', () => {
    const pause = spyOn(mediaStateService, 'pause');

    component.mediaState.playing = true;
    fixture.detectChanges();

    const button = de.query(By.css('#pause'));
    button.nativeElement.click();

    expect(pause).toHaveBeenCalled();
  });

  it('should execute service mute when mute button was clicked', () => {
    const mute = spyOn(mediaStateService, 'mute');

    const button = de.query(By.css('#mute'));
    button.nativeElement.click();

    expect(mute).toHaveBeenCalled();
  });

  it('should execute service unmute when unmute button was clicked', () => {
    const unmute = spyOn(mediaStateService, 'unmute');

    component.mediaState.muted = true;
    fixture.detectChanges();

    const button = de.query(By.css('#unmute'));
    button.nativeElement.click();

    expect(unmute).toHaveBeenCalled();
  });

  it('should execute service seekback when play seekback was clicked', () => {
    const seekBack = spyOn(mediaStateService, 'seekBack');

    const button = de.query(By.css('#seek-back'));
    button.nativeElement.click();

    expect(seekBack).toHaveBeenCalled();
  });

  it('should execute service seekForward when play seekForward was clicked', () => {
    const seekForward = spyOn(mediaStateService, 'seekForward');

    const button = de.query(By.css('#seek-forward'));
    button.nativeElement.click();

    expect(seekForward).toHaveBeenCalled();
  });

  it('should execute service fullscreen when fullscreen button was clicked', () => {
    const fullscreen = spyOn(mediaStateService, 'fullscreen');

    const button = de.query(By.css('#fullscreen'));
    button.nativeElement.click();

    expect(fullscreen).toHaveBeenCalled();
  });

  it('should execute service fullscreenExit when play fullscreenExit was clicked', () => {
    const fullscreenExit = spyOn(mediaStateService, 'fullscreenExit');

    component.mediaState.fullscreen = true;
    fixture.detectChanges();

    const button = de.query(By.css('#fullscreen-exit'));
    button.nativeElement.click();

    expect(fullscreenExit).toHaveBeenCalled();
  });
});
