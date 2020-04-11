import {Directive, ElementRef, Input} from '@angular/core';
import {fromEvent} from 'rxjs';
import {first} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Directive({
  selector: '[appImg]',
})
export class ImagePreloadDirective {

  @Input() appImg: string;

  constructor(private el: ElementRef) {
    el.nativeElement.src = 'src/assets/images/loading.png';
    fromEvent(el.nativeElement, 'error')
      .pipe(first()).subscribe(() => this.el.nativeElement.src = 'src/assets/images/img-not-found.png');
    fromEvent(el.nativeElement, 'load')
      .pipe(first()).subscribe(() => this.el.nativeElement.src = environment.imgUrl + this.appImg);
  }
}
