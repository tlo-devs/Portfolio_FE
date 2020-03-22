import {Component, OnInit} from '@angular/core';
import {ProductItemModel} from '../_models/product-item.model';
import {ProductService} from './product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {flatMap, map, takeUntil} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  private active: string;
  private category: string;
  parent: string;
  portfolioItems: ProductItemModel[];

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params.pipe(
      flatMap(p => {
        this.category = p.category;
        return this.productService.preview();
      })
    ).subscribe(items => {
      this.active = this.route.snapshot.url[0].path;
      this.portfolioItems = this.filterBy(items);
    });
    this.route.parent.url.subscribe(parent => this.parent = parent[0].path);
  }

  toDetails(item: ProductItemModel) {
    this.router.navigate([`${this.parent}/${item.type}/${item.category}/${item.id}`]);
  }

  filterBy(items: ProductItemModel[]): ProductItemModel[] {
    return items.filter(item =>
      this.active === 'all' || (item.type === this.active &&
      (this.category === 'all' || item.category === this.category))
    );
  }

}
