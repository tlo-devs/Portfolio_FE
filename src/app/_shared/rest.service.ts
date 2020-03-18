import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  get(url: string, options?: {}): Observable<any> {
    return this.http.get(environment.apiUrl + url, options);
  }

  post(url: string, body: {}, options?: {}): Observable<any> {
    return this.http.post(environment.apiUrl + url, body, options);
  }

  patch(url: string, body: {}, options?: {}): Observable<any> {
    return this.http.patch(environment.apiUrl + url, body, options);
  }

  delete(url: string, options?: {}): Observable<any> {
    return this.http.delete(environment.apiUrl + url, options);
  }
}
