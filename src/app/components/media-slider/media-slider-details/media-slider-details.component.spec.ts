import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaSliderDetailsComponent } from './media-slider-details.component';
import { DebugElement, Directive, Input, Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import Medias from '../../../../assets/data/medias';
import { Media } from 'app/shared/models/media';
import { RouterTestingModule } from '@angular/router/testing';

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

describe('MediaSliderDetailsComponent', () => {
  let component: MediaSliderDetailsComponent;
  let fixture: ComponentFixture<MediaSliderDetailsComponent>;
  let de: DebugElement;
  let MEDIA: Media;

  beforeEach(async(() => {
    MEDIA = [...Medias][0];

    TestBed.configureTestingModule({
      declarations: [MediaSliderDetailsComponent, RouterLinkDirectiveStub],
      imports: [RouterTestingModule.withRoutes(routes)],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaSliderDetailsComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not be showing up if has no active media', () => {
    const container = de.query(By.css('.details'));

    expect(container).toBeFalsy();
  });

  it('should emmit closeMediaEvent when the close button is clicked', () => {
    const closeEvent = spyOn(component.closeMediaEvent, 'next');
    component.activeMedia = MEDIA;
    fixture.detectChanges();

    const closeButton = de.query(By.css('.details__close-button'))
      .nativeElement;
    closeButton.click();

    expect(closeEvent).toHaveBeenCalled();
  });

  it('should have the background with the billboard image of the active media', () => {
    component.activeMedia = MEDIA;
    fixture.detectChanges();

    const detailsImage = de.query(By.css('.details__image')).nativeElement;
    const detailsImageBackground = detailsImage.style.backgroundImage;

    expect(detailsImageBackground).toContain(component.activeMedia.billboard);
  });

  it('should have the correct route for the media', () => {
    component.activeMedia = MEDIA;
    fixture.detectChanges();

    const routerLink = de
      .query(By.directive(RouterLinkDirectiveStub))
      .injector.get(RouterLinkDirectiveStub);

    const playButton = de.query(By.css('#play'));
    playButton.nativeElement.click();
    fixture.detectChanges();

    expect(routerLink.navigatedTo).toEqual([
      '/watch',
      component.activeMedia.id,
    ]);
  });
});
