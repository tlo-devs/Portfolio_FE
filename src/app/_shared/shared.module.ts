import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {ImagePreloadDirective} from './directives/image-preload.directive';
import {NavComponent} from './nav/nav.component';
import {ProductFilterComponent} from '../product/product-filter/product-filter.component';

@NgModule({
  declarations: [
    NavComponent,
    ImagePreloadDirective,
    ProductFilterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    NavComponent,
    ProductFilterComponent,
    ImagePreloadDirective
  ]
})
export class SharedModule { }
