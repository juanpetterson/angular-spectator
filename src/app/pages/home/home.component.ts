import { Component, OnInit, OnDestroy } from '@angular/core';

import { ColorService } from 'src/app/core/services/color.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  inverseColors = false;
  public currentColor: string;
  private unsubscribe$ = new Subject();

  constructor(private colorService: ColorService) {}

  ngOnInit(): void {
    this.colorService.currentColor$.subscribe((color) => {
      this.currentColor = color;
    });
  }

  onClickToggle(event): void {
    this.colorService.setColor(event.target.value);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
