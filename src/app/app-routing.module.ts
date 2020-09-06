import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MediaBrowserPageComponent } from './pages/media-browser-page/media-browser-page.component';
import { AuthGuard } from './core/guards/auth.guard';
import { WatchPlayerComponent } from './components/watch-player/watch-player.component';
import { AccountPageComponent } from './pages/account-page/account-page.component';

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
    canActivate: [AuthGuard],
    data: { isLogin: true },
  },
  {
    path: 'browse',
    component: MediaBrowserPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'watch/:id',
    component: WatchPlayerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'account',
    component: AccountPageComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '/', canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
