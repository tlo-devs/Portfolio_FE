import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminComponent} from './admin.component';
import {AuthGuard} from '../auth/auth.guard';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptor} from '../auth/jwt.interceptor';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'portfolio',
    canActivate: [AuthGuard]
  },
  {
    path: 'portfolio',
    component: AdminComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'shop',
    component: AdminComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
