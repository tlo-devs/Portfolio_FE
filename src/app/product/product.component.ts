import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ProductService} from './product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, zip} from 'rxjs';
import {ProductFilterModel} from '../_models/product-filter.model';
import {map} from 'rxjs/operators';
import {PortfolioItemModel} from '../_models/portfolio-item.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {

  filters: ProductFilterModel[];

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.productService.filters$().subscribe(f => this.filters = f);
  }

  portfolioItems$(): Observable<PortfolioItemModel[]> {
    return zip(this.route.params, this.productService.preview('portfolio'))
      .pipe(map(zipped => this.filterBy(zipped[1] as PortfolioItemModel[], zipped[0].category)));
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
