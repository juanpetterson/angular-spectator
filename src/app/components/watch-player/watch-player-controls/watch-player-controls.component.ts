import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MediaState } from '../models/media-state';
import { MediaStateService } from '../services/media-state.service';
import { Media } from 'app/shared/models/media';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-watch-player-controls',
  templateUrl: './watch-player-controls.component.html',
  styleUrls: ['./watch-player-controls.component.scss'],
})
export class WatchPlayerControlsComponent implements OnInit, OnDestroy {
  @Input() media: Media;
  public mediaState: MediaState;
  private subscription: Subscription;

  constructor(private mediaStateService: MediaStateService) {}

  ngOnInit(): void {
    this.subscription = this.mediaStateService.mediaStateChanged.subscribe(
      (state) => {
        this.mediaState = state;
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onPlay(): void {
    this.mediaStateService.play();
  }

  onPause(): void {
    this.mediaStateService.pause();
  }

  onSeekBack(): void {
    this.mediaStateService.seekBack();
  }

  onSeekForward(): void {
    this.mediaStateService.seekForward();
  }

  onMute(): void {
    this.mediaStateService.mute();
  }

  onUnmute(): void {
    this.mediaStateService.unmute();
  }

  onFullscreen(): void {
    this.mediaStateService.fullscreen();
  }

  onFullscreenExit(): void {
    this.mediaStateService.fullscreenExit();
  }
}
