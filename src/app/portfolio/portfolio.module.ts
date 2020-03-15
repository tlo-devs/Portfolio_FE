import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PortfolioRoutingModule} from './portfolio-routing.module';
import {SharedModule} from '../_shared/shared.module';
import {PortfolioService} from './portfolio.service';
import {PortfolioItemResolver} from './portfolio-item.resolver';

import {PortfolioComponent} from './portfolio.component';
import { PortfolioDetailsComponent } from './portfolio-details/portfolio-details.component';
import { PortfolioFilterComponent } from './portfolio-filter/portfolio-filter.component';



@NgModule({
  declarations: [
    PortfolioComponent,
    PortfolioDetailsComponent,
    PortfolioFilterComponent
  ],
  imports: [
    CommonModule,
    PortfolioRoutingModule,
    SharedModule
  ],
  providers: [PortfolioService, PortfolioItemResolver]
})
export class PortfolioModule { }
