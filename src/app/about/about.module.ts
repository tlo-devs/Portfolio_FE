import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';

import {SharedModule} from '../_shared/shared.module';

import {AboutComponent} from './about.component';

@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{path: '', component: AboutComponent}])
  ]
})
export class AboutModule { }
