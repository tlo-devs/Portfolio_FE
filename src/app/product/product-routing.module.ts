import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProductComponent} from './product.component';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {ProductItemResolver} from './product-item.resolver';
import {ProductGuard} from './product.guard';

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
    path: 'image/:category/:id',
    component: ProductDetailsComponent,
    resolve: {
      product: ProductItemResolver
    }
  },
  {
    path: 'image/:category',
    component: ProductComponent
  },
  {
    path: 'image',
    redirectTo: 'image/all'
  },
  {
    path: 'video/:category/:id',
    component: ProductDetailsComponent,
    resolve: {
      product: ProductItemResolver
    }
  },
  {
    path: 'video/:category',
    component: ProductComponent
  },
  {
    path: 'video',
    redirectTo: 'video/all'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {
}
