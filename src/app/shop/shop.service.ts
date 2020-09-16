import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {RestService} from '../_shared/rest.service';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private rest: RestService) { }

  completeOrder$<T>(id: string): Observable<T> {
    return this.rest.post(`orders/${id}/complete`, {});
  }
}
