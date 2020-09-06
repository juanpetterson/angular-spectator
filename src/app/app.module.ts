import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HeaderComponent } from './components/header/header.component';
import { MediaBrowserPageComponent } from './pages/media-browser-page/media-browser-page.component';
import { MediaSliderComponent } from './components/media-slider/media-slider.component';
import { MaturityStyleDirective } from './shared/directives/maturity-style.directive';
import { BillboardComponent } from './components/billboard/billboard.component';
import { WatchPlayerComponent } from './components/watch-player/watch-player.component';
import { WatchPlayerControlsComponent } from './components/watch-player/watch-player-controls/watch-player-controls.component';
import { MediaSliderItemComponent } from './components/media-slider/media-slider-item/media-slider-item.component';
import { MediaSliderDetailsComponent } from './components/media-slider/media-slider-details/media-slider-details.component';
import { AccountPageComponent } from './pages/account-page/account-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HeaderComponent,
    MediaBrowserPageComponent,
    MediaSliderComponent,
    MaturityStyleDirective,
    BillboardComponent,
    WatchPlayerComponent,
    WatchPlayerControlsComponent,
    MediaSliderItemComponent,
    MediaSliderDetailsComponent,
    AccountPageComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
