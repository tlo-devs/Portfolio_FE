import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {ProductItemModel} from '../_models/product-item.model';
import {ProductService} from './product.service';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {isArray} from 'util';

@Injectable()
export class ProductItemResolver implements Resolve<ProductItemModel> {

  constructor(private productService: ProductService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ProductItemModel> {
    return this.productService.product(route.params.id, route.url[0].path).pipe(map(d => {

      // surpressed because the is uri on preview
      // @ts-ignore
      d.preview.uri = environment.imgUrl + d.preview.uri;

      if (isArray(d.content)) {
        // same here
        // @ts-ignore
        d.content.map(c => c.uri = environment.imgUrl + c.uri);
      }
      return d;
    }));
  }
}
