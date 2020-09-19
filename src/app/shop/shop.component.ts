import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {ProductService} from '../product/product.service';
import {ShopItemModel} from '../_models/shop/shop-item.model';
import {ProductFilterModel} from '../_models/product-filter.model';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html'
})
export class ShopComponent implements OnInit {

  filters: ProductFilterModel[];
  shopItems: ShopItemModel[];

  constructor(private router: Router,
              private productService: ProductService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.shopItems$().subscribe(items => this.shopItems = items);
    this.productService.filters$('shop').subscribe(f => this.filters = f);
  }

  toDetails(item: ShopItemModel): void {
    this.router.navigate([`shop/${item.type}/${item.category}/${item.id}`], {
      state: {item}
    });
  }

  private shopItems$(): Observable<ShopItemModel[]> {
    return this.productService.items$('shop', this.route) as Observable<ShopItemModel[]>;
  }
}
