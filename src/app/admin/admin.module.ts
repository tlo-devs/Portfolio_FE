import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminComponent} from './admin.component';
import {HttpClientModule} from '@angular/common/http';
import {AdminRoutingModule} from './admin-routing.module';
import {FormsModule} from '@angular/forms';

import {AdminService} from './admin.service';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatDividerModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule
  ],
  providers: [AdminService]
})
export class AdminModule {
}
