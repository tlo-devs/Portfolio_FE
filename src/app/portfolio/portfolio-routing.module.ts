import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PortfolioComponent} from './portfolio.component';
import {PortfolioDetailsComponent} from './portfolio-details/portfolio-details.component';
import {PortfolioItemResolver} from './portfolio-item.resolver';
import {PortfolioGuard} from './portfolio.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'all'
  },
  {
    path: 'all',
    component: PortfolioComponent,
    pathMatch: 'full'
  },
  {
    path: 'image/:category/:id',
    component: PortfolioDetailsComponent
  },
  {
    path: 'image/:category',
    component: PortfolioComponent
  },
  {
    path: 'image',
    redirectTo: 'image/all'
  },
  {
    path: 'video/:category/:id',
    component: PortfolioDetailsComponent
  },
  {
    path: 'video/:category',
    component: PortfolioComponent
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
export class PortfolioRoutingModule {
}
