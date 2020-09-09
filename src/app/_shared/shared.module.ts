import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {ImagePreloadDirective} from './directives/image-preload.directive';
import {NavComponent} from './nav/nav.component';

@NgModule({
  declarations: [
    NavComponent,
    ImagePreloadDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    NavComponent,
    ImagePreloadDirective
  ]
})
export class SharedModule { }
