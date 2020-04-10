import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {AuthComponent} from './auth.component';


@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: AuthComponent}]),
    FormsModule
  ]
})
export class AuthModule { }
