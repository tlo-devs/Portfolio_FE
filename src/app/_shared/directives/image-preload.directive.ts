import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appImg]',
})
export class ImagePreloadDirective {

  @Input() appImg: string;

  private hasError: boolean;

  constructor(private el: ElementRef) {
    el.nativeElement.src = 'assets/images/img-loading.jpg';
  }

  @HostListener('load', ['$event'])
  loaded() {
    if (!this.hasError) {
      this.el.nativeElement.src = this.appImg;
    }
  }

  @HostListener('error', ['$event'])
  fallback() {
    if (!this.hasError) {
      this.hasError = true;
      this.el.nativeElement.src = 'assets/images/img-not-found.png';
    }
  }
}
