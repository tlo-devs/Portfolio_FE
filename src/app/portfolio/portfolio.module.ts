import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PortfolioRoutingModule} from './portfolio-routing.module';
import {SharedModule} from '../_shared/shared.module';
import {PortfolioService} from './portfolio.service';

import {PortfolioComponent} from './portfolio.component';


@NgModule({
  declarations: [PortfolioComponent],
  imports: [
    CommonModule,
    PortfolioRoutingModule,
    SharedModule
  ],
  providers: [PortfolioService]
})
export class PortfolioModule { }
