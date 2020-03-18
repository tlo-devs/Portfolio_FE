import { Injectable } from '@angular/core';
import {CanLoad, Route, Router, UrlSegment} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private router: Router) { }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | boolean {
    if (localStorage.getItem('jwt') === 'admin') {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
