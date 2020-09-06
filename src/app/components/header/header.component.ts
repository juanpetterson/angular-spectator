import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef,
  Input,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { AuthService } from 'app/core/services/auth.service';
import { User } from 'app/shared/models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('header') headerEl: ElementRef;
  @ViewChild('dropdown') dropdown: ElementRef;
  @Input() backgroundColor = 'transparent';
  @Input() showNavigation = true;
  public loggedUser: User;
  public hoverDropdown = false;
  private subscription: Subscription;

  @HostListener('window:scroll')
  onWindowScroll() {
    if (this.backgroundColor === 'transparent') {
      if (window.pageYOffset > 0) {
        this.headerEl.nativeElement.classList.add('header--dark');
      } else {
        this.headerEl.nativeElement.classList.remove('header--dark');
      }
    }
  }

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.subscription = this.authService.isAuthenticated$.subscribe((user) => {
      this.loggedUser = user;
    });
  }

  ngAfterViewInit() {
    this.headerEl.nativeElement.classList.add(
      `header--${this.backgroundColor}`
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onLogout() {
    this.authService.logout();
  }
}
