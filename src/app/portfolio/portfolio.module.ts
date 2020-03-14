import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PortfolioRoutingModule} from './portfolio-routing.module';
import {SharedModule} from '../_shared/shared.module';
import {PortfolioService} from './portfolio.service';

import {PortfolioComponent} from './portfolio.component';
import { PortfolioDetailsComponent } from './portfolio-details/portfolio-details.component';


@NgModule({
  declarations: [
    PortfolioComponent,
    PortfolioDetailsComponent
  ],
  imports: [
    CommonModule,
    PortfolioRoutingModule,
    SharedModule
  ],
  providers: [PortfolioService]
})
export class PortfolioModule { }
