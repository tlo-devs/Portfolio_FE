import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  get<T>(url: string, options?: {}): Observable<T> {
    return this.http.get<T>(environment.apiUrl + url, options);
  }

  post<T>(url: string, body: {}, options?: {}): Observable<T> {
    return this.http.post<T>(environment.apiUrl + url, body, options);
  }

  patch<T>(url: string, body: {}, options?: {}): Observable<T> {
    return this.http.patch<T>(environment.apiUrl + url, body, options);
  }

  delete<T>(url: string, options?: {}): Observable<T> {
    return this.http.delete<T>(environment.apiUrl + url, options);
  }
}
