import { Component, OnInit, OnDestroy } from '@angular/core';
import { MediaService } from '../../core/services/media.service';
import { Media } from 'app/shared/models/media';
import { MediaStorageService } from 'app/core/services/media-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-media-browser-page',
  templateUrl: './media-browser-page.component.html',
  styleUrls: ['./media-browser-page.component.scss'],
})
export class MediaBrowserPageComponent implements OnInit, OnDestroy {
  public medias: Media[];
  public myMedias: Media[];
  public mediasOriginals: Media[];
  public billboardMedia: Media;
  private subscriptions: Subscription[] = [];

  constructor(
    private mediaService: MediaService,
    private storageService: MediaStorageService
  ) {}

  ngOnInit(): void {
    this.loadMedias();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  private loadMedias(): void {
    this.subscriptions.push(
      this.mediaService.getBillboardMedia().subscribe((billboardMedia) => {
        this.billboardMedia = billboardMedia;
      })
    );
    this.subscriptions.push(
      this.mediaService.getMedias().subscribe((medias) => {
        this.medias = medias;
      })
    );
    this.subscriptions.push(
      this.mediaService.getMediasOriginals().subscribe((mediasOriginals) => {
        this.mediasOriginals = mediasOriginals;
      })
    );
    this.myMedias = this.storageService.getStoredMedias();
  }
}
