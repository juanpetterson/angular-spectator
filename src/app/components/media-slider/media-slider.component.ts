import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  AfterViewChecked,
  OnDestroy,
} from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { Subscription, fromEvent } from 'rxjs';
import { Media } from 'app/shared/models/media';

@Component({
  selector: 'app-media-slider',
  templateUrl: './media-slider.component.html',
  styleUrls: ['./media-slider.component.scss'],
})
export class MediaSliderComponent
  implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild('slider') slider: ElementRef;
  @Input() medias: Media[];
  @Input() listTitle: string;
  @Input() isOriginals: boolean;
  public activeMedia: Media;
  public hoverSlide = false;
  public sliderItems = [];
  public showPrev = false;
  public showNext = true;
  public totalPages = [];
  public currentPage = 0;
  public showPagesCount = false;
  private showItems = 1;
  private sliderTotalScroll = 0;
  private sliderTotalWidth = 0;
  private hoverItemIndex = -1;
  private translateX = 0;
  private totalMoved = 0;
  private subscription: Subscription;

  constructor() {}

  ngOnInit(): void {
    this.sliderItems = this.medias;
    this.updateSliderState();
    this.updateTotalPages();
    this.showNext = this.totalPages.length > 1;

    this.subscription = fromEvent(window, 'resize')
      .pipe(debounceTime(500))
      .subscribe((_) => {
        this.onWindowResize();
      });
  }

  ngAfterViewChecked(): void {
    this.sliderTotalScroll = this.slider.nativeElement.scrollWidth;
    this.sliderTotalWidth = this.slider.nativeElement.clientWidth;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onWindowResize(): void {
    this.updateSliderState();
    this.updateTotalPages();

    this.sliderTotalScroll = this.slider.nativeElement.scrollWidth;
    this.sliderTotalWidth = this.slider.nativeElement.clientWidth;

    this.currentPage = 0;
    this.translateX = 0;
    this.slider.nativeElement.style.transform = `translateX(${this.translateX}px)`;
    this.totalMoved = 0;

    this.showPrev = this.currentPage > 0;
    this.showNext = this.currentPage < this.totalPages.length - 1;
  }

  updateSliderState(): void {
    const windowWidth = window.innerWidth;
    let showItems = 3;

    if (windowWidth > 1400) {
      showItems = 6;
    } else if (windowWidth > 1100) {
      showItems = 5;
    } else if (windowWidth > 800) {
      showItems = 4;
    }

    this.showItems = showItems;
  }

  updateTotalPages(): void {
    this.totalPages = new Array(
      Math.ceil(this.sliderItems.length / this.showItems)
    ).fill(0);
  }

  updateCurrentPage(): void {
    this.currentPage = Math.ceil(this.totalMoved / this.showItems);
  }

  handlePrevious(): void {
    this.showNext = true;
    this.currentPage--;
    let toTranslate = this.sliderTotalWidth - this.sliderTotalWidth * 0.08;

    const exceededPerPage = this.sliderItems.length % this.showItems;

    if (
      this.currentPage === this.totalPages.length - 1 &&
      exceededPerPage !== 0
    ) {
      toTranslate =
        ((this.sliderTotalWidth - this.sliderTotalWidth * 0.08) /
          this.showItems) *
        exceededPerPage;
    }

    if (this.translateX + toTranslate >= 0) {
      this.translateX = 0;
    } else {
      this.translateX += toTranslate;
    }

    this.slider.nativeElement.style.transform = `translateX(${this.translateX}px)`;

    this.totalMoved -= this.showItems;

    this.showPrev = this.currentPage > 0;
  }

  handleNext(): void {
    this.showPrev = true;
    this.currentPage++;
    const toTranslate = this.sliderTotalWidth - this.sliderTotalWidth * 0.08;

    if (
      this.sliderTotalScroll - this.sliderTotalWidth <
      Math.abs(this.translateX) + toTranslate
    ) {
      this.translateX =
        (this.sliderTotalScroll -
          this.sliderTotalWidth +
          this.sliderTotalWidth * 0.04) *
        -1;
    } else {
      this.translateX -= toTranslate;
    }

    this.slider.nativeElement.style.transform = `translateX(${this.translateX}px)`;

    this.totalMoved += this.showItems;

    this.showNext = this.currentPage < this.totalPages.length - 1;
  }

  onEnterSlider(): void {
    this.hoverSlide = true;
    this.showPagesCount = this.totalPages.length > 1;
  }

  onLeaveSlider(): void {
    this.hoverSlide = false;
    this.showPagesCount = false;
  }

  onHoverItem(index: number): void {
    this.hoverItemIndex = index;
  }
  onLeaveItem(): void {
    this.hoverItemIndex = -1;
  }

  onActiveMediaChange(activeMedia): void {
    this.activeMedia = activeMedia;
  }

  onCloseMedia(): void {
    this.activeMedia = null;
  }

  canHover() {
    return !(
      this.hoverItemIndex === -1 ||
      this.activeMedia ||
      this.isOriginals
    );
  }

  getTranformStyle(itemIndex: number): string {
    if (!this.canHover()) {
      return '';
    }

    const firstItemHover = this.isFirstItemIndex();
    const lastItemHover = this.isLastItemIndex();
    const baseScale = 2;
    const baseTranslate = 50;

    // current item
    if (itemIndex === this.hoverItemIndex) {
      if (firstItemHover) {
        return `scale(${baseScale}) translateX(${baseTranslate / 2}%)`;
      }
      if (lastItemHover) {
        return `scale(${baseScale}) translateX(-${baseTranslate / 2}%)`;
      }
      return `scale(${baseScale})`;
    }

    // previous item
    if (itemIndex < this.hoverItemIndex) {
      if (firstItemHover) {
        return 'translateX(0)';
      }
      if (lastItemHover) {
        return `translateX(-${baseTranslate * 2}%)`;
      }
      return `translateX(-${baseTranslate}%)`;
    }

    // next item
    if (itemIndex > this.hoverItemIndex) {
      if (firstItemHover) {
        return `translateX(${baseTranslate * 2}%)`;
      }
      if (lastItemHover) {
        return 'translateX(0)';
      }
      return `translateX(${baseTranslate}%)`;
    }

    return '';
  }

  private isFirstItemIndex(): boolean {
    if (
      this.currentPage === this.totalPages.length - 1 &&
      this.totalPages.length > 1
    ) {
      return this.hoverItemIndex === this.sliderItems.length - this.showItems;
    }
    return this.currentPage * this.showItems === this.hoverItemIndex;
  }

  private isLastItemIndex(): boolean {
    if (
      this.hoverItemIndex === this.sliderItems.length - 1 &&
      this.sliderItems.length - 1 > this.showItems
    ) {
      return true;
    }
    return (this.currentPage + 1) * this.showItems - 1 === this.hoverItemIndex;
  }
}
