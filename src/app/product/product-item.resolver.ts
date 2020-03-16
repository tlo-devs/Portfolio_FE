import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable, of} from 'rxjs';
import {ProductItemModel} from '../_models/product-item.model';
import {ProductService} from './product.service';

@Injectable()
export class ProductItemResolver implements Resolve<ProductItemModel> {

  constructor(private portfolioService: ProductService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ProductItemModel> {
    // return this.portfolioService.product(route.params.id);
    // fixme mock
    return of({
      id: route.params.id,
      preview: {
        alt: 'hdrseh',
        uri: 'dhrxth'
      },
      title: 'srthgsrg'
    });
  }
}
