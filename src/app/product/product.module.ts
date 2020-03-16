import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductRoutingModule} from './product-routing.module';
import {SharedModule} from '../_shared/shared.module';
import {ProductService} from './product.service';
import {ProductItemResolver} from './product-item.resolver';
import {ProductGuard} from './product.guard';

import {ProductComponent} from './product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';


@NgModule({
  declarations: [
    ProductComponent,
    ProductDetailsComponent,
    ProductFilterComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule
  ],
  providers: [ProductService, ProductItemResolver, ProductGuard]
})
export class ProductModule { }
