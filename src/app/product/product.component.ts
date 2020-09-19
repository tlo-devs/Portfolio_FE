import {Component, OnInit} from '@angular/core';
import {ProductService} from './product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, of, zip} from 'rxjs';
import {ProductFilterModel} from '../_models/product-filter.model';
import {flatMap, map} from 'rxjs/operators';
import {PortfolioItemModel} from '../_models/portfolio/portfolio-item.model';

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
    this.productService.filters$('portfolio').subscribe(f => this.filters = f);
  }

  toDetails(item: PortfolioItemModel): void {
    this.router.navigate([`portfolio/${item.type}/${item.category}/${item.id}`], {
      state: {item}
    });
  }

  private portfolioItems$(): Observable<PortfolioItemModel[]> {
    return this.productService.items$('portfolio', this.route) as Observable<PortfolioItemModel[]>;
  }
}
