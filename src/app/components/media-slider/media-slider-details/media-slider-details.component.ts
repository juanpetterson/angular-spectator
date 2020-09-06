import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Media } from 'app/shared/models/media';

@Component({
  selector: 'app-media-slider-details',
  templateUrl: './media-slider-details.component.html',
  styleUrls: ['./media-slider-details.component.scss'],
})
export class MediaSliderDetailsComponent implements OnInit {
  @Output() closeMediaEvent = new EventEmitter<string>();
  @Input() activeMedia: Media;

  constructor() {}

  ngOnInit(): void {}

  onCloseMedia() {
    this.closeMediaEvent.next(null);
  }
}
