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

  logout() {
    localStorage.removeItem('access_token');
    location.reload();
  }

  addToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  token(): string {
    return localStorage.getItem('access_token');
  }
}
