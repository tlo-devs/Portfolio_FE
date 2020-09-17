import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProductItemResolver} from '../product/product-item.resolver';
import {ShopItemComponent} from './shop-item/shop-item.component';
import {ShopComponent} from './shop.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'all'
  },
  {
    path: 'all',
    component: ShopComponent,
    pathMatch: 'full'
  },
  {
    path: 'digital/:category/:id',
    component: ShopItemComponent,
    resolve: {
      product: ProductItemResolver
    }
  },
  {
    path: 'digital/:category',
    component: ShopComponent
  },
  {
    path: 'digital',
    redirectTo: 'digital/all'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule {
}
