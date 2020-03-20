import { Injectable } from '@angular/core';
import {CanActivate, CanLoad, Route, Router, UrlSegment, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor(private router: Router) { }

  canLoad(): boolean {
    if (localStorage.getItem('access_token')) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }

  canActivate(): boolean | UrlTree {
    return !!localStorage.getItem('access_token') || this.router.parseUrl('/login');
  }
}
