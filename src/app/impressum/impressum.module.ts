import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';

import {ImpressumComponent} from './impressum.component';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [ImpressumComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{path: '', component: ImpressumComponent}])
  ]
})
export class ImpressumModule { }
