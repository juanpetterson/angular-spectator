import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaSliderItemComponent } from './media-slider-item.component';
import { Directive, Input, DebugElement, Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import Medias from '../../../../assets/data/medias';
import { Media } from 'app/shared/models/media';
import { Router } from '@angular/router';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[routerLink]',
  host: { '(click)': 'onClick()' },
})
// tslint:disable-next-line: directive-class-suffix
class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

@Component({
  selector: 'app-test',
  template: '',
})
class TestComponent {}

const routes = [
  {
    path: 'watch/:id',
    component: TestComponent,
  },
];

describe('MediaSliderItemComponent', () => {
  let component: MediaSliderItemComponent;
  let fixture: ComponentFixture<MediaSliderItemComponent>;
  let de: DebugElement;
  let MEDIA: Media;
  let router: Router;

  beforeEach(async(() => {
    MEDIA = [...Medias][0];

    TestBed.configureTestingModule({
      declarations: [MediaSliderItemComponent, RouterLinkDirectiveStub],
      imports: [RouterTestingModule.withRoutes(routes)],
    }).compileComponents();

    router = TestBed.inject(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaSliderItemComponent);
    component = fixture.componentInstance;
    component.media = MEDIA;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should activeMediaChange emmit when show details arrow is clicked', () => {
    const activeMediaEvent = spyOn(component.activeMediaChange, 'next');

    const showDetailsButton = de.query(By.css('.media-content__arrow-down'))
      .nativeElement;
    showDetailsButton.click();
    fixture.detectChanges();

    expect(activeMediaEvent).toHaveBeenCalledWith(MEDIA);
  });

  it('should have the correct route for the media', () => {
    const routerLink = de
      .query(By.directive(RouterLinkDirectiveStub))
      .injector.get(RouterLinkDirectiveStub);
    fixture.detectChanges();

    const mediaContent = de.query(By.css('#media-content')).nativeElement;
    mediaContent.click();
    fixture.detectChanges();

    expect(routerLink.navigatedTo).toEqual(['/watch', component.media.id]);
  });

  it('should navigate to the correct route when the play button is clicked', () => {
    const navigate = spyOn(router, 'navigate');

    const playButton = de.query(By.css('#play')).nativeElement;
    playButton.click();
    fixture.detectChanges();

    expect(navigate).toHaveBeenCalledWith(['/watch', component.media.id]);
  });

  it('should have the correct media background', () => {
    const backgroundImage = de.query(By.css('.slider-item__background-image'))
      .nativeElement;

    expect(backgroundImage.src).toContain(MEDIA.thumbnail);

    component.isOriginals = true;
    fixture.detectChanges();

    expect(backgroundImage.src).toContain(MEDIA.poster);
  });

  it('should have the active class when the item is active', () => {
    component.active = true;
    fixture.detectChanges();

    const sliderItem = de.query(By.css('.slider-item')).nativeElement;

    const activeClass = 'slider-item--active';

    expect(sliderItem.classList).toContain(activeClass);
  });
});
