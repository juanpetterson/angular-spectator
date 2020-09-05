import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  public currentColor$ = new BehaviorSubject<string>('red');

  setColor(color: string): void {
    this.currentColor$.next(color);
  }
}
