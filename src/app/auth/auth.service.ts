import { Injectable } from '@angular/core';
import {RestService} from '../_shared/rest.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly url = 'login/';

  constructor(private restService: RestService) { }

  tryLogin(credentials: {username: string, password: string}): Observable<{access_token: string}> {
    return this.restService.post(this.url, credentials);
  }

  isExpired(): boolean {
    if (this.token) {
      const jwtExpiry = JSON.parse(atob(this.token.split('.')[1])).exp;
      console.log((jwtExpiry * 1000), Date.now());
      return !jwtExpiry || (jwtExpiry * 1000) < (Date.now());
    }
    return true;
  }

  logout() {
    localStorage.removeItem('access_token');
    location.reload();
  }

  set token(token: string) {
    localStorage.setItem('access_token', token);
  }

  get token(): string {
    return localStorage.access_token;
  }
}
