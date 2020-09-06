import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, Input, Directive, Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { BillboardComponent } from './billboard.component';
import { Media } from 'app/shared/models/media';
import Medias from '../../../assets/data/medias';

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

describe('BillboardComponent', () => {
  let component: BillboardComponent;
  let fixture: ComponentFixture<BillboardComponent>;
  let de: DebugElement;
  let MEDIA: Media;

  beforeEach(async(() => {
    MEDIA = [...Medias][0];

    TestBed.configureTestingModule({
      declarations: [BillboardComponent, RouterLinkDirectiveStub],
      imports: [RouterTestingModule.withRoutes(routes)],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillboardComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    component.media = MEDIA;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct route for the media', () => {
    const routerLink = de
      .query(By.directive(RouterLinkDirectiveStub))
      .injector.get(RouterLinkDirectiveStub);

    const playButton = de.query(By.css('#play'));
    playButton.nativeElement.click();
    fixture.detectChanges();

    expect(routerLink.navigatedTo).toEqual(['/watch', MEDIA.id]);
  });

  it('should have the correct source image for the billboard', () => {
    const image = de.query(By.css('.billboard__image'));

    expect(image.nativeElement.src).toContain(MEDIA.billboard);
  });
});
