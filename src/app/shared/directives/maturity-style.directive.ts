import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appMaturityStyle]',
})
export class MaturityStyleDirective implements AfterViewInit {
  constructor(private elRef: ElementRef) {}

  ngAfterViewInit() {
    this.updateMaturityStyle(this.elRef.nativeElement.innerText);
  }

  updateMaturityStyle(value: any): void {
    let backgroundColor = '';
    let color = '';

    if (value >= 18) {
      backgroundColor = 'rgb(19, 17, 17)';
      color = 'rgb(255, 255, 255)';
    } else if (value >= 16) {
      backgroundColor = 'rgb(215, 38, 45)';
      color = 'rgb(255, 255, 255)';
    } else if (value >= 14) {
      backgroundColor = 'rgb(231, 121, 43)';
      color = 'rgb(255, 255, 255)';
    } else if (value >= 12) {
      backgroundColor = 'rgb(247, 199, 39)';
      color = 'rgb(0, 0, 0)';
    } else if (value >= 10) {
      backgroundColor = 'rgb(46, 136, 189)';
      color = 'rgb(255, 255, 255)';
    } else if (value === 'L') {
      backgroundColor = 'rgb(0, 156, 76)';
      color = 'rgb(255, 255, 255)';
    } else {
      backgroundColor = 'rgb(200, 200, 200)';
      color = 'rgb(0, 0, 0)';
    }

    this.elRef.nativeElement.style.backgroundColor = backgroundColor;
    this.elRef.nativeElement.style.color = color;
    this.elRef.nativeElement.style.fontWeight = 'bold';
  }
}
