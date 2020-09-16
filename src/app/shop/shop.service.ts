import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {RestService} from '../_shared/rest.service';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private rest: RestService) { }

  completeOrder$(id: string): Observable<{order_id: string, grant: string}> {
    return this.rest.post(`orders/${id}/complete/`, undefined);
  }
}
