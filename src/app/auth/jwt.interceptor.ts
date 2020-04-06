import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthService} from './auth.service';
import {catchError} from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.token}`
        }
      });
    }
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        this.authService.logout();
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }
}
