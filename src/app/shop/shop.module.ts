import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ShopItemComponent} from './shop-item/shop-item.component';
import {ProductItemResolver} from '../product/product-item.resolver';
import {ProductService} from '../product/product.service';
import {SharedModule} from '../_shared/shared.module';
import {NgxPayPalModule} from 'ngx-paypal';
import {ShopRoutingModule} from './shop-routing.module';
import { ShopComponent } from './shop.component';

@NgModule({
  declarations: [ShopItemComponent, ShopComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgxPayPalModule,
    ShopRoutingModule
  ],
  providers: [ProductItemResolver, ProductService]
})
export class ShopModule { }
