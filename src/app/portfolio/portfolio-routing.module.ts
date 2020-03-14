import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PortfolioComponent} from './portfolio.component';
import {PortfolioDetailsComponent} from './portfolio-details/portfolio-details.component';
import {PortfolioItemResolver} from './portfolio-item.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'all'
  },
  {
    path: 'all',
    component: PortfolioComponent
  },
  {
    path: 'details/:id',
    component: PortfolioDetailsComponent,
    resolve: {
      portfolioItem: PortfolioItemResolver
    }
  },
  {
    path: 'details',
    redirectTo: 'details/:id'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortfolioRoutingModule {
}
