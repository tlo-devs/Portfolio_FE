import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), pathMatch: 'full'},
  {path: 'impressum', loadChildren: () => import('./impressum/impressum.module').then(m => m.ImpressumModule)},
  {path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule)},
  {path: 'data-protection', loadChildren: () => import('./data-protection/data-protection.module').then(m => m.DataProtectionModule)},
  {path: 'portfolio', loadChildren: () => import('./product/product.module').then(m => m.ProductModule)},
  {path: 'shop', loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule)},
  {path: '**', loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
