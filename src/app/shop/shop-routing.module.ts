import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProductItemResolver} from '../product/product-item.resolver';
import {ShopItemComponent} from './shop-item/shop-item.component';
import {ProductComponent} from '../product/product.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'all'
  },
  {
    path: 'all',
    component: ProductComponent,
    pathMatch: 'full'
  },
  {
    path: 'all/digital/:id',
    component: ShopItemComponent,
    resolve: {
      product: ProductItemResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule {
}
