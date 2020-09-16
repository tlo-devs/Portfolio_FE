import {Injectable} from '@angular/core';
import {RestService} from '../_shared/rest.service';
import {Observable, ReplaySubject, zip} from 'rxjs';
import {flatMap, map} from 'rxjs/operators';
import {AdminType} from '../_models/admin-type.type';
import {ProductFilterModel} from '../_models/product-filter.model';
import {PortfolioItemModel} from '../_models/portfolio-item.model';
import {ShopItemModel} from '../_models/shop-item.model';
import {ProductItemType} from '../_models/product-item.type';

@Injectable()
export class ProductService {

  private readonly portfolioUrl = 'portfolio/';
  private readonly shopUrl = 'shop/';
  private readonly categoriesUrl = 'categories/portfolio/';

  private portfolioCache$: ReplaySubject<PortfolioItemModel[]>;
  private shopCache$: ReplaySubject<ShopItemModel[]>;
  private filtersCache$: ReplaySubject<ProductFilterModel[]>;

  constructor(private rest: RestService) {
  }

  preview(route: AdminType): Observable<Array<PortfolioItemModel | ShopItemModel>> {
    switch (route) {
      case 'portfolio':
        if (this.portfolioCache$) {
          return this.portfolioCache$;
        }
        return this.getAll$<PortfolioItemModel>(this.portfolioUrl)
          .pipe(flatMap(items => this.initCache$(route, items))) as Observable<PortfolioItemModel[]>;
      case 'shop':
        if (this.shopCache$) {
          return this.shopCache$;
        }
        return this.rest.get<ShopItemModel[]>(this.shopUrl)
          .pipe(flatMap(items => this.initCache$(route, items))) as Observable<ShopItemModel[]>;
    }
  }

  product(id: number, route: AdminType, type: ProductItemType): Observable<ShopItemModel | PortfolioItemModel> {
    let url: string;
    switch (route) {
      case 'portfolio':
        url = `${this.portfolioUrl}${type}/${id}/`;
        break;
      case 'shop':
        url = `${this.shopUrl}${id}/`;
        break;
    }
    return this.rest.get(url);
  }

  filters$(): Observable<ProductFilterModel[]> {
    if (this.filtersCache$) {
      return this.filtersCache$;
    }
    return this.rest.get<ProductFilterModel>(this.categoriesUrl)
      .pipe(flatMap(filters => this.initCache$('filters', filters.children) as Observable<ProductFilterModel[]>));
  }

  private getAll$<T>(url: string): Observable<T[]> {
    return zip(
      this.rest.get<T[]>(url + 'image/'),
      this.rest.get<T[]>(url + 'video/')
    ).pipe(map(d => [...d[0], ...d[1]]));
  }

  private initCache$(
    cacheType: AdminType,
    items: Array<PortfolioItemModel | ShopItemModel | ProductFilterModel>
  ): Observable<Array<PortfolioItemModel | ShopItemModel | ProductFilterModel>> {
    switch (cacheType) {
      case 'portfolio':
        (this.portfolioCache$ = new ReplaySubject<PortfolioItemModel[]>(1)).next(items as PortfolioItemModel[]);
        return this.portfolioCache$;
      case 'shop':
        (this.shopCache$ = new ReplaySubject<ShopItemModel[]>(1)).next(items as ShopItemModel[]);
        return this.shopCache$;
      case 'filters':
        (this.filtersCache$ = new ReplaySubject<ProductFilterModel[]>(1)).next(items as ProductFilterModel[]);
        return this.filtersCache$;
    }
  }
}
