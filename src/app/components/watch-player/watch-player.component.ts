import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { throttleTime, delay } from 'rxjs/operators';
import { Media } from 'app/shared/models/media';
import {
  MediaState,
  EVENT_PLAY,
  EVENT_MUTE,
  EVENT_SEEKBACK,
  EVENT_SEEKFORWARD,
  EVENT_FULLSCREEN,
  EVENT_PAUSE,
  EVENT_UNMUTE,
  EVENT_FULLSCREEN_EXIT,
  EVENT_RESET,
} from './models/media-state';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MediaService } from 'app/core/services/media.service';
import { MediaStateService } from './services/media-state.service';
import { MediaStorageService } from '../../core/services/media-storage.service';

@Component({
  selector: 'app-watch-player',
  templateUrl: './watch-player.component.html',
  styleUrls: ['./watch-player.component.scss'],
})
export class WatchPlayerComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('player') playerEl: ElementRef;
  @ViewChild('header') headerEl: ElementRef;
  @ViewChild('footer') footerEl: ElementRef;
  public media: Media;
  public progress = 0;
  public loading = true;
  private mediaState: MediaState;
  private subscriptions: Subscription[] = [];
  private player: HTMLVideoElement;
  private thread;

  constructor(
    private mediaService: MediaService,
    private mediaStateService: MediaStateService,
    private storageService: MediaStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = +params.id;
      this.mediaService.getMedia(id).subscribe((media) => {
        this.media = media;
      });

      if (!this.media) {
        this.router.navigate(['/not-found']);
      }
    });

    this.subscriptions.push(
      this.mediaStateService.mediaStateChanged.subscribe((state) => {
        this.mediaState = state;
        this.mediaState.id = this.media.id;
        this.mediaState.title = this.media.title;
      })
    );

    this.subscriptions.push(
      this.mediaStateService.mediaStateEvent.subscribe((stateEvent) => {
        this.onMediaStateChange(stateEvent);
      })
    );

    this.subscriptions.push(
      fromEvent(document, 'fullscreenchange').subscribe((_) => {
        if (!document.fullscreenElement) {
          this.mediaState.fullscreen = false;
        }
      })
    );

    this.subscriptions.push(
      fromEvent(window, 'mousemove').subscribe(() => this.onMouseStop())
    );

    this.subscriptions.push(
      fromEvent(window, 'mousedown').subscribe(() => this.onMouseStop())
    );
  }

  ngAfterViewInit(): void {
    this.player = this.playerEl.nativeElement;
    this.loadStoredMedia();

    this.subscriptions.push(
      fromEvent(this.player, 'timeupdate')
        .pipe(throttleTime(500))
        .subscribe((event: Event) => {
          this.mediaState.currentTime = (event.target as HTMLVideoElement).currentTime;
          this.progress =
            (this.player.currentTime / this.player.duration) * 100;
          this.storageService.updateStoredMedia(
            this.mediaState.id,
            this.mediaState.currentTime
          );
        })
    );
    this.subscriptions.push(
      fromEvent(this.player, 'ended').subscribe((_) => {
        this.mediaState.playing = false;
        this.progress = 100;
      })
    );
    this.subscriptions.push(
      fromEvent(this.player, 'canplay')
        .pipe(delay(2000))
        .subscribe((_) => {
          this.loading = false;
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  loadStoredMedia(): void {
    const storedMedia = this.storageService.getStoredMedia(this.media.id);
    if (storedMedia) {
      this.mediaState.currentTime = storedMedia.currentTime;
      this.player.currentTime = storedMedia.currentTime;
    }
  }

  showComponents(): void {
    this.footerEl.nativeElement.style.opacity = 1;
    this.footerEl.nativeElement.style.zIndex = '0';
    this.headerEl.nativeElement.style.opacity = 1;
    this.headerEl.nativeElement.style.zIndex = '0';
    this.player.style.cursor = 'default';
  }

  hideComponents(): void {
    this.footerEl.nativeElement.style.opacity = 0;
    this.headerEl.nativeElement.style.opacity = 0;
    this.player.style.cursor = 'none';

    setTimeout(() => {
      this.footerEl.nativeElement.style.zIndex = '-1';
      this.headerEl.nativeElement.style.zIndex = '-1';
    }, 500);
  }

  onMouseStop(): void {
    this.showComponents();
    clearTimeout(this.thread);
    this.thread = setTimeout(() => this.hideComponents(), 3000);
  }

  onTogglePlaying(): void {
    if (!this.mediaState.playing) {
      if (!this.loading) {
        this.mediaStateService.play();
      }
    } else {
      this.mediaStateService.pause();
    }
  }

  onToggleFullscreen(): void {
    if (!this.mediaState.fullscreen) {
      this.mediaStateService.fullscreen();
    } else {
      this.mediaStateService.fullscreenExit();
    }
  }

  onMediaStateChange(eventType: string): void {
    switch (eventType) {
      case EVENT_PLAY:
        this.player.play();
        break;
      case EVENT_PAUSE:
        this.player.pause();
        break;
      case EVENT_SEEKBACK:
        this.player.currentTime -= 10;
        break;
      case EVENT_SEEKFORWARD:
        this.player.currentTime += 10;
        break;
      case EVENT_MUTE:
        this.player.muted = true;
        break;
      case EVENT_UNMUTE:
        this.player.muted = false;
        break;
      case EVENT_FULLSCREEN:
        document.documentElement.requestFullscreen();
        break;
      case EVENT_FULLSCREEN_EXIT:
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
        break;
      case EVENT_RESET:
        this.player.pause();
        this.player.muted = false;
        this.player.currentTime = 0;
        break;
      default:
        break;
    }
  }
}
