import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {ProductItemModel} from '../_models/product-item.model';
import {ProductService} from './product.service';
import {AdminType} from '../_models/admin-type.type';
import {ProductItemType} from '../_models/product-item.type';
import {ShopItemModel} from '../_models/shop-item.model';
import {PortfolioItemModel} from '../_models/portfolio-item.model';

@Injectable()
export class ProductItemResolver implements Resolve<ProductItemModel> {

  constructor(private productService: ProductService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ShopItemModel | PortfolioItemModel> {
    const parent: AdminType = route.parent.url[0].path as AdminType;
    const item = this.router.getCurrentNavigation()?.extras?.state?.item;
    if (item) {
      return of(item as ShopItemModel | PortfolioItemModel);
    }

    return this.productService.product(route.params.id, parent, route.url[0].path as ProductItemType);
  }
}
