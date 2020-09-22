import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {RestService} from '../_shared/rest.service';
import {OrdersModel} from '../_models/shop/orders.model';
import {environment} from '../../environments/environment';
import {ShopItemType} from '../_models/shop/shop-item-type';
import {ShopStateModel} from '../_models/shop/shop-state.model';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private rest: RestService) { }

  completeOrder$(id: string): Observable<{order_id: string, grant: string}> {
    return this.rest.post(`orders/${id}/complete/`, undefined);
  }

  createOrder$(type: ShopItemType, id: number): Promise<OrdersModel> {
    return fetch(environment.apiUrl + `shop/${type}/${id}/payment/`, {
      method: 'POST'
    }).then(res => res.json());
  }

  downloadItem(download: ShopStateModel): void {
    window.open(environment.apiUrl + `orders/${download.orderId}/download/?grant=${download.grant}`, '_blank');
  }
}
