import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';
import { Media } from 'app/shared/models/media';
import { Router } from '@angular/router';

@Component({
  selector: 'app-media-slider-item',
  templateUrl: './media-slider-item.component.html',
  styleUrls: ['./media-slider-item.component.scss'],
})
export class MediaSliderItemComponent implements OnInit, OnChanges {
  @Output() activeMediaChange = new EventEmitter<Media>();
  @Input() media: Media;
  @Input() activeMedia: Media;
  @Input() isOriginals: boolean;
  public active: boolean;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.active = this.activeMedia && this.activeMedia.id === this.media.id;
  }

  onPlayMedia(): void {
    this.router.navigate(['/watch', this.media.id]);
  }

  onShowDetails(): void {
    this.activeMediaChange.next(this.media);
  }
}
