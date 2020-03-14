import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {NavComponent} from './nav/nav.component';
import {ImagePreloadDirective} from './directives/image-preload.directive';

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
