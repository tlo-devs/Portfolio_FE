import { Injectable } from '@angular/core';
import {CanActivate, CanLoad, Router, UrlTree} from '@angular/router';

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
