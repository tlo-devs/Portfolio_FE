import {Injectable} from '@angular/core';
import {CanActivate, CanLoad, Router, UrlTree} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor(private router: Router) {
  }

  canLoad(): boolean {
    if (localStorage.getItem('access_token')) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }

  canActivate(): boolean | UrlTree {
    const jwt = localStorage.getItem('access_token');
    if (jwt) {
      const expired = (): boolean => {
        const jwtExpiry = new Date(JSON.parse(atob(jwt.split('.')[1])).iat).getTime();
        return false;
      };
      return !expired() || this.router.parseUrl('/login');
    }
    return this.router.parseUrl('/login');
  }
}
