import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {ProductItemModel} from '../_models/product-item.model';
import {ProductService} from './product.service';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {isArray} from 'util';
import {AdminType} from '../_models/admin-type.type';

@Injectable()
export class ProductItemResolver implements Resolve<ProductItemModel> {

  constructor(private productService: ProductService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ProductItemModel> {

    const parent: AdminType = route.parent.url[0].path as AdminType;
    const param = parent === 'shop' ? undefined : route.url[0].path;

    return this.productService.product(route.params.id, parent, param).pipe(map(d => {

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
