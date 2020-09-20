import {Injectable} from '@angular/core';
import {RestService} from '../_shared/rest.service';
import {Observable, of, ReplaySubject, zip} from 'rxjs';
import {flatMap, map} from 'rxjs/operators';
import {AdminType} from '../_models/admin-type.type';
import {ProductFilterModel} from '../_models/product-filter.model';
import {PortfolioItemModel} from '../_models/portfolio/portfolio-item.model';
import {ShopItemModel} from '../_models/shop/shop-item.model';
import {ProductItemType} from '../_models/product-item.type';
import {ActivatedRoute} from '@angular/router';

@Injectable()
export class ProductService {

  private readonly portfolioUrl = 'portfolio/';
  private readonly shopUrl = 'shop/';
  private readonly categoriesUrl = 'categories/';

  private portfolioCache$: ReplaySubject<PortfolioItemModel[]>;
  private shopCache$: ReplaySubject<ShopItemModel[]>;

  private portfolioFiltersCache$: ReplaySubject<ProductFilterModel[]>;
  private shopFiltersCache$: ReplaySubject<ProductFilterModel[]>;

  constructor(private rest: RestService) {
  }

  preview(route: AdminType): Observable<Array<PortfolioItemModel | ShopItemModel>> {
    switch (route) {
      case 'portfolio':
        if (this.portfolioCache$) {
          return this.portfolioCache$;
        }
        return this.getAll$<PortfolioItemModel>(this.portfolioUrl, route)
          .pipe(flatMap(items => this.initCache$(route, items))) as Observable<PortfolioItemModel[]>;
      case 'shop':
        if (this.shopCache$) {
          return this.shopCache$;
        }
        return this.getAll$<ShopItemModel>(this.shopUrl, route)
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

  filters$(type: 'shop' | 'portfolio'): Observable<ProductFilterModel[]> {
    switch (type) {
      case 'portfolio':
        if (this.portfolioFiltersCache$) {
          return this.portfolioFiltersCache$;
        }
        break;
      case 'shop':
        if (this.shopFiltersCache$) {
          return this.shopFiltersCache$;
        }
        break;
    }
    return this.rest.get<ProductFilterModel>(this.categoriesUrl + type + '/')
      .pipe(flatMap(filters => this.initCache$(type + 'Filters' as AdminType, filters.children) as Observable<ProductFilterModel[]>));
  }

  filterBy(items: Array<PortfolioItemModel | ShopItemModel>, category: string, route: 'portfolio' | 'shop', active: string)
    : Array<PortfolioItemModel | ShopItemModel> {
    if (active === 'all') {
      return items;
    }
    return items.filter(item => item.type === active
      && (category === 'all' || item.category === category));
  }

  items$(route: 'portfolio' | 'shop', activatedRoute: ActivatedRoute): Observable<Array<PortfolioItemModel | ShopItemModel>> {
    return activatedRoute.params.pipe(
      flatMap(res => zip(this.preview(route), of(res))),
      map(zipped => this.filterBy(
        zipped[0],
        zipped[1].category,
        route,
        activatedRoute.snapshot.url[0].path
      ))
    );
  }

  private getAll$<T>(url: string, route: 'portfolio' | 'shop'): Observable<T[]> {
    switch (route) {
      case 'shop':
        return this.rest.get<T[]>(url + 'digital/');
      case 'portfolio':
        return zip(
          this.rest.get<T[]>(url + 'image/'),
          this.rest.get<T[]>(url + 'video/')
        ).pipe(map(d => [...d[0], ...d[1]]));
    }
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
      case 'portfolioFilters':
        (this.portfolioFiltersCache$ = new ReplaySubject<ProductFilterModel[]>(1)).next(items as ProductFilterModel[]);
        return this.portfolioFiltersCache$;
      case 'shopFilters':
        (this.shopFiltersCache$ = new ReplaySubject<ProductFilterModel[]>(1)).next(items as ProductFilterModel[]);
        return this.shopFiltersCache$;
    }
  }
}
