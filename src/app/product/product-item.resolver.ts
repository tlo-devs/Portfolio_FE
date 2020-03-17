import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable, of} from 'rxjs';
import {ProductItemModel} from '../_models/product-item.model';
import {ProductService} from './product.service';

@Injectable()
export class ProductItemResolver implements Resolve<ProductItemModel> {

  constructor(private productService: ProductService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ProductItemModel> {
    return this.productService.product(route.params.id, route.url[0].path);
  }
}
