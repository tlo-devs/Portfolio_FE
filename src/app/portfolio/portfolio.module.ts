import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';

import {PortfolioComponent} from './portfolio.component';
import {SharedModule} from '../_shared/shared.module';
import {PortfolioService} from './portfolio.service';

@NgModule({
  declarations: [PortfolioComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{path: '', component: PortfolioComponent}])
  ],
  providers: [PortfolioService]
})
export class PortfolioModule { }
