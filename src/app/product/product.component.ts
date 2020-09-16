import {Component, OnInit} from '@angular/core';
import {ProductService} from './product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, of, zip} from 'rxjs';
import {ProductFilterModel} from '../_models/product-filter.model';
import {flatMap, map} from 'rxjs/operators';
import {PortfolioItemModel} from '../_models/portfolio-item.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {

  filters: ProductFilterModel[];
  portfolioItems: PortfolioItemModel[];

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.portfolioItems$().subscribe(res => this.portfolioItems = res);
    this.productService.filters$().subscribe(f => this.filters = f);
  }

  portfolioItems$(): Observable<PortfolioItemModel[]> {
    return this.route.params.pipe(
      flatMap(res => zip(this.productService.preview('portfolio'), of(res))),
      map(zipped => this.filterBy(zipped[0] as PortfolioItemModel[], zipped[1].category))
    );
  }

  toDetails(item: PortfolioItemModel): void {
    this.router.navigate([`portfolio/${item.type}/${item.category}/${item.id}`], {
      state: {item}
    });
  }

  private filterBy(items: PortfolioItemModel[], category: string): PortfolioItemModel[] {
    const active = this.route.snapshot.url[0].path;
    return items.filter(item =>
      active === 'all' || (item.type === active &&
      (category === 'all' || item.category === category))
    );
  }

}
