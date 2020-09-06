import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaSliderComponent } from './media-slider.component';
import {
  DebugElement,
  Component,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import Medias from '../../../assets/data/medias';
import { Media } from 'app/shared/models/media';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'app-media-slider-item',
  template: '',
})
class MediaSliderItemComponent {
  @Output() activeMediaChange = new EventEmitter<Media>();
  @Input() media: Media;
  @Input() activeMedia: Media;
  @Input() isOriginals: boolean;
}

describe('MediaSliderComponent', () => {
  let component: MediaSliderComponent;
  let fixture: ComponentFixture<MediaSliderComponent>;
  let de: DebugElement;
  let MEDIAS: Media[];

  beforeEach(async(() => {
    MEDIAS = [...Medias];

    TestBed.configureTestingModule({
      declarations: [MediaSliderComponent, MediaSliderItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaSliderComponent);
    component = fixture.componentInstance;
    component.medias = MEDIAS;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render each media as a MediaSliderItemComponent', () => {
    const sliderItems = de.queryAll(By.css('app-media-slider-item'));
    expect(sliderItems.length).toEqual(MEDIAS.length);
  });

  it('should have the correct list title', () => {
    const listTitle = 'List Title';
    component.listTitle = listTitle;
    fixture.detectChanges();

    const title = de.query(By.css('.media-slider__title')).nativeElement;
    expect(title.innerText).toEqual(listTitle);
  });

  it('should not show the pages count when showPagesCount is false', () => {
    component.showPagesCount = false;
    fixture.detectChanges();

    const pagesCount = de.query(By.css('.pages-count')).nativeElement;
    expect(pagesCount.style.visibility).toEqual('hidden');
  });

  it('should show the pages count when showPagesCount is true', () => {
    component.showPagesCount = true;
    fixture.detectChanges();

    const pagesCount = de.query(By.css('.pages-count')).nativeElement;
    expect(pagesCount.style.visibility).toEqual('visible');
  });

  it('should not show the left arrow when showPrev is false', () => {
    component.showPrev = false;
    fixture.detectChanges();

    const rightArrow = de.query(By.css('.slider__left-arrow'));
    expect(rightArrow).toBeFalsy();
  });

  it('should not show the right arrow when showNext is false', () => {
    component.showNext = false;
    fixture.detectChanges();

    const rightArrow = de.query(By.css('.slider__right-arrow'));
    expect(rightArrow).toBeFalsy();
  });

  it('should show the left arrow and do not show the arrow icon when showPrev is true', () => {
    component.showPrev = true;
    fixture.detectChanges();

    const rightArrow = de.query(By.css('.slider__left-arrow'));
    expect(rightArrow).toBeTruthy();

    const arrowIcon = de.query(By.css('.fa-chevron-left')).nativeElement;
    expect(arrowIcon.style.visibility).toEqual('hidden');
  });

  it('should show the right arrow and do not show the arrow icon when showNext is true', () => {
    component.showNext = true;
    fixture.detectChanges();

    const rightArrow = de.query(By.css('.slider__right-arrow'));
    expect(rightArrow).toBeTruthy();

    const arrowIcon = de.query(By.css('.fa-chevron-right')).nativeElement;
    expect(arrowIcon.style.visibility).toEqual('hidden');
  });

  it('should show the left arrow and show the arrow icon when showPrev and hoverSlide is true', () => {
    component.showPrev = true;
    component.hoverSlide = true;
    fixture.detectChanges();

    const rightArrow = de.query(By.css('.slider__left-arrow'));
    expect(rightArrow).toBeTruthy();

    const arrowIcon = de.query(By.css('.fa-chevron-left')).nativeElement;
    expect(arrowIcon.style.visibility).toEqual('visible');
  });

  it('should show the right arrow and show the arrow icon when showNext and hoverSlide is true', () => {
    component.showNext = true;
    component.hoverSlide = true;
    fixture.detectChanges();

    const rightArrow = de.query(By.css('.slider__right-arrow'));
    expect(rightArrow).toBeTruthy();

    const arrowIcon = de.query(By.css('.fa-chevron-right')).nativeElement;
    expect(arrowIcon.style.visibility).toEqual('visible');
  });
});
