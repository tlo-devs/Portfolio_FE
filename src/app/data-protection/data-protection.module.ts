import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DataProtectionComponent} from './data-protection.component';
import {SharedModule} from '../_shared/shared.module';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [DataProtectionComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{path: '', component: DataProtectionComponent}])
  ]
})
export class DataProtectionModule { }
