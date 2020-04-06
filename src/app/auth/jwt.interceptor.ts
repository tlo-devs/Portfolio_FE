import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthService} from './auth.service';
import {catchError, tap} from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.token}`
        }
      });
    }
    return next.handle(request).pipe(
      tap(() => {
        if (this.auth.isExpired()) {
          this.auth.logout();
          return throwError('Could not authorize.');
        }
      }),
      catchError(err => {
        if (err.status === 401) {
          this.auth.logout();
        }

        const error = err.error.message || err.statusText;
        return throwError(error);
      }));
  }
}
