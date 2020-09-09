import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {ProductService} from '../product/product.service';
import {ShopItemModel} from '../_models/shop-item.model';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopComponent {

  constructor(private router: Router, private productService: ProductService) { }

  shopItems$(): Observable<ShopItemModel[]> {
    return this.productService
      .preview('shop')
      .pipe(map(d => d as ShopItemModel[]));
  }

  toDetails(item: ShopItemModel): void {
    this.router.navigate([`shop/all/digital/${item.id}`], {
      state: {item}
    });
  }
}
