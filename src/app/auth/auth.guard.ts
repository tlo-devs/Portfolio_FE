import {Injectable} from '@angular/core';
import {CanActivate, CanLoad, Router, UrlTree} from '@angular/router';
import {AuthService} from './auth.service';
import {error} from 'util';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor(private router: Router,
              private auth: AuthService) {
  }

  canLoad(): boolean {
    if (this.auth.token) {
      if (this.auth.isExpired()) {
        this.router.navigateByUrl('/login');
        return false;
      }
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }

  canActivate(): boolean | UrlTree {
    if (this.auth.token) {
      if (this.auth.isExpired()) {
        this.auth.logout();
        return this.router.parseUrl('/login');
      }
      return true;
    }
    return this.router.parseUrl('/login');
  }
}
