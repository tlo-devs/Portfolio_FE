import {Component, OnInit} from '@angular/core';
import {ProductItemModel} from '../_models/product-item.model';
import {ProductService} from './product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {flatMap} from 'rxjs/operators';
import {AdminType} from '../_models/admin-type.type';
import {zip} from 'rxjs';
import {ProductFilterModel} from '../_models/product-filter.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  private active: string;
  private category: string;
  parent: AdminType;
  filters: ProductFilterModel[];
  portfolioItems: ProductItemModel[];

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    zip(this.route.parent.url, this.route.params).pipe(
      flatMap(res => {
        this.category = res[1].category;
        this.parent = res[0][0].path as AdminType;

        if (this.parent === 'portfolio') {
          this.productService.filters$().subscribe(f => this.filters = f);
        }

        return this.productService.preview(this.parent);
      })
    ).subscribe(items => {
      this.active = this.route.snapshot.url[0].path;

      this.portfolioItems = this.filterBy(Array.isArray(items) ? items : [items]);
    });
  }

  toDetails(item: ProductItemModel) {
    const route = this.parent === 'shop'
      ? `${this.parent}/all/digital/${item.id}`
      : `${this.parent}/${item.type}/${item.category}/${item.id}`;
    this.router.navigate([route]);
  }

  filterBy(items: ProductItemModel[]): ProductItemModel[] {
    return items.filter(item =>
      this.active === 'all' || (item.type === this.active &&
      (this.category === 'all' || item.category === this.category))
    );
  }

}
