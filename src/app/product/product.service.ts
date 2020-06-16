import {Injectable} from '@angular/core';
import {RestService} from '../_shared/rest.service';
import {Observable, of, ReplaySubject} from 'rxjs';
import {ProductItemModel} from '../_models/product-item.model';
import {HttpParams} from '@angular/common/http';
import {flatMap, map} from 'rxjs/operators';
import {ImageService} from '../_shared/image.service';
import {environment} from '../../environments/environment';
import {AdminType} from '../_models/admin-type.type';
import {isArray} from 'util';
import {ParamsConfigModel} from '../_models/params-config.model';
import {ProductFilterModel} from '../_models/product-filter.model';

@Injectable()
export class ProductService {

  private readonly portfolioUrl = 'portfolio/';
  private readonly shopUrl = 'shop/';

  portfolioCache$: ReplaySubject<ProductItemModel[]>;
  shopCache$: ReplaySubject<ProductItemModel[]>;
  filtersCache$: ReplaySubject<ProductFilterModel[]>;

  constructor(private rest: RestService,
              private imageService: ImageService) {
  }

  preview(route: AdminType): Observable<ProductItemModel[]> {
    const paramsConfig: ParamsConfigModel = {type: 'fields', params: ['id', 'title', 'preview']};

    switch (route) {
      case 'portfolio':
        if (this.portfolioCache$) {
          return this.portfolioCache$;
        }
        paramsConfig.params.push('type', 'category');
        return this.createRequest$<ProductItemModel[]>(this.portfolioUrl, paramsConfig)
          .pipe(flatMap(items => this.initCache$(route, items))) as Observable<ProductItemModel[]>;
      case 'shop':
        if (this.shopCache$) {
          return this.shopCache$;
        }
        paramsConfig.params.push('current_price', 'base_price', 'sale');
        return this.createRequest$<ProductItemModel[]>(this.shopUrl, paramsConfig)
          .pipe(flatMap(items => this.initCache$(route, items))) as Observable<ProductItemModel[]>;
    }
  }

  product(id: number, route: AdminType, type?: string): Observable<ProductItemModel> {
    let url: string;
    let paramsConfig: ParamsConfigModel;
    switch (route) {
      case 'portfolio':
        url = this.portfolioUrl;
        paramsConfig = {type: 'type', params: [type]};
        break;
      case 'shop':
        url = this.shopUrl;
        break;
    }
    return this.createRequest$<ProductItemModel>(url + id, paramsConfig);
  }

  filters$(): Observable<ProductFilterModel[]> {
    if (this.filtersCache$) {
      return this.filtersCache$;
    }
    return of([
      {
        name: 'alles',
        key: 'all',
        categories: []
      },
      {
        name: 'videos',
        key: 'video',
        categories: [
          {name: 'alles', key: 'all'},
          {name: 'Imagevideos', key: 'imagevideo'},
          {name: 'Aftermovies', key: 'aftermovie'},
          {name: 'Kurzfilme', key: 'shortmovie'},
          {name: 'Musikvideos', key: 'musicvideo'}
        ]
      },
      {
        name: 'bilder',
        key: 'image',
        categories: [
          {name: 'alles', key: 'all'},
          {name: 'Landschaftsphotographie', key: 'landscape'},
          {name: 'Architektur', key: 'architecture'},
          {name: 'Portraits', key: 'portrait'}
        ]
      }
    ]) as Observable<ProductFilterModel[]>;
  }

  image<T>(url: string): Observable<T> {
    return this.imageService.get(url);
  }

  shopItem<T>(id: string): Observable<T> {
    return this.rest.get(`orders/${id}/`);
  }

  private createRequest$<T>(url: string, paramsConfig?: ParamsConfigModel): Observable<T> {
    return this.rest.get(url, paramsConfig
      ? {params: new HttpParams().append(paramsConfig.type, paramsConfig.params.join(','))}
      : undefined)
      .pipe(map(i => isArray(i) ? i : [i]));
  }

  private mapPreviewUri(items: ProductItemModel[]): ProductItemModel[] {
    return (items as Array<ProductItemModel & { preview: { uri: string, alt: string } }>).map(i => {
      i.preview.uri = environment.imgUrl + i.preview.uri;
      return i;
    });
  }

  private initCache$(
    cacheType: AdminType,
    items: Array<ProductItemModel | ProductFilterModel>): Observable<Array<ProductItemModel | ProductFilterModel>> {
    switch (cacheType) {
      case 'portfolio':
        (this.portfolioCache$ = new ReplaySubject<ProductItemModel[]>(1)).next(this.mapPreviewUri(items as ProductItemModel[]));
        return this.portfolioCache$;
      case 'shop':
        (this.shopCache$ = new ReplaySubject<ProductItemModel[]>(1)).next(this.mapPreviewUri(items as ProductItemModel[]));
        return this.shopCache$;
      case 'filters':
        (this.filtersCache$ = new ReplaySubject<ProductFilterModel[]>(1)).next(items as ProductFilterModel[]);
    }
  }
}
