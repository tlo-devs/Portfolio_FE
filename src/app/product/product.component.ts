import {Component, OnInit} from '@angular/core';
import {ProductItemModel} from '../_models/product-item.model';
import {ProductService} from './product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject, zip} from 'rxjs';
import {ProductFilterModel} from '../_models/product-filter.model';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {

  portfolioItems$: Subject<ProductItemModel[]>;
  filters$: Subject<ProductFilterModel[]>;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.portfolioItems$ = new Subject<ProductItemModel[]>();
    this.filters$ = new Subject<ProductFilterModel[]>();
    this.productService.filters$()
      .subscribe(this.filters$);
    zip(this.route.params, this.productService.preview('portfolio'))
      .pipe(map(zipped => this.filterBy(Array.isArray(zipped[1]) ? zipped[1] : [zipped[1]], zipped[0].category)))
      .subscribe(this.portfolioItems$);
  }

  toDetails(item: ProductItemModel) {
    this.router.navigate([`portfolio/${item.type}/${item.category}/${item.id}`]);
  }

  filterBy(items: ProductItemModel[], category: string): ProductItemModel[] {
    const active = this.route.snapshot.url[0].path;
    return items.filter(item =>
      active === 'all' || (item.type === active &&
      (category === 'all' || item.category === category))
    );
  }

}
