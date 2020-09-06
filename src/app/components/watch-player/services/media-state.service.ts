import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import {
  MediaState,
  EVENT_PLAY,
  EVENT_MUTE,
  EVENT_SEEKBACK,
  EVENT_SEEKFORWARD,
  EVENT_FULLSCREEN,
  EVENT_FULLSCREEN_EXIT,
  EVENT_PAUSE,
  EVENT_UNMUTE,
  EVENT_RESET,
} from '../models/media-state';

@Injectable({
  providedIn: 'root',
})
export class MediaStateService {
  private _initialState: MediaState = {
    id: 0,
    title: '',
    playing: false,
    muted: false,
    fullscreen: false,
    duration: 0,
    currentTime: 0,
  };

  private mediaState: MediaState = { ...this._initialState };

  public mediaStateChanged = new BehaviorSubject<MediaState>(this.mediaState);
  public mediaStateEvent = new Subject<string>();

  constructor() {}

  play(): void {
    this.mediaState.playing = true;
    this.mediaStateChanged.next(this.mediaState);
    this.mediaStateEvent.next(EVENT_PLAY);
  }

  pause(): void {
    this.mediaState.playing = false;
    this.mediaStateChanged.next(this.mediaState);
    this.mediaStateEvent.next(EVENT_PAUSE);
  }

  mute(): void {
    this.mediaState.muted = true;
    this.mediaStateChanged.next(this.mediaState);
    this.mediaStateEvent.next(EVENT_MUTE);
  }

  unmute(): void {
    this.mediaState.muted = false;
    this.mediaStateChanged.next(this.mediaState);
    this.mediaStateEvent.next(EVENT_UNMUTE);
  }

  seekBack(): void {
    this.mediaState.currentTime -= 10;
    this.mediaStateChanged.next(this.mediaState);
    this.mediaStateEvent.next(EVENT_SEEKBACK);
  }

  seekForward(): void {
    this.mediaState.currentTime += 10;
    this.mediaStateChanged.next(this.mediaState);
    this.mediaStateEvent.next(EVENT_SEEKFORWARD);
  }

  fullscreen(): void {
    this.mediaState.fullscreen = true;
    this.mediaStateChanged.next(this.mediaState);
    this.mediaStateEvent.next(EVENT_FULLSCREEN);
  }

  fullscreenExit(): void {
    this.mediaState.fullscreen = false;
    this.mediaStateChanged.next(this.mediaState);
    this.mediaStateEvent.next(EVENT_FULLSCREEN_EXIT);
  }

  reset(): void {
    this.mediaState.playing = this._initialState.playing;
    this.mediaState.muted = this._initialState.muted;
    this.mediaState.fullscreen = this._initialState.fullscreen;
    this.mediaState.currentTime = this._initialState.currentTime;

    this.mediaStateChanged.next(this.mediaState);
    this.mediaStateEvent.next(EVENT_RESET);
  }

  get initialState() {
    return this._initialState;
  }
}
