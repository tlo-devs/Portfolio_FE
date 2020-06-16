import {Injectable} from '@angular/core';
import {RestService} from '../_shared/rest.service';
import {Observable, ReplaySubject} from 'rxjs';
import {ProductItemModel} from '../_models/product-item.model';
import {HttpParams} from '@angular/common/http';
import {flatMap, map} from 'rxjs/operators';
import {ImageService} from '../_shared/image.service';
import {environment} from '../../environments/environment';
import {AdminType} from '../_models/admin-type.type';
import {isArray} from 'util';
import {ParamsConfigModel} from '../_models/params-config.model';

@Injectable()
export class ProductService {

  private readonly portfolioUrl = 'portfolio/';
  private readonly shopUrl = 'shop/';

  portfolioCache$: ReplaySubject<ProductItemModel[]>;
  shopCache$: ReplaySubject<ProductItemModel[]>;

  constructor(private rest: RestService,
              private imageService: ImageService) {
  }

  preview(route: AdminType): Observable<ProductItemModel[]> {
    const paramsConfig: ParamsConfigModel = {type: 'fields', params: ['id', 'title', 'preview']};

    switch (route) {
      case 'portfolio':
        if (this.portfolioCache$) {
          return this.portfolioCache$.asObservable();
        }
        paramsConfig.params.push('type', 'category');
        return this.createRequest$<ProductItemModel[]>(this.portfolioUrl, paramsConfig)
          .pipe(flatMap(items => this.initCache$(route, items)));
      case 'shop':
        if (this.shopCache$) {
          return this.shopCache$.asObservable();
        }
        paramsConfig.params.push('current_price', 'base_price', 'sale');
        return this.createRequest$<ProductItemModel[]>(this.shopUrl, paramsConfig)
          .pipe(flatMap(items => this.initCache$(route, items)));
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

  private initCache$(cacheType: AdminType, items: ProductItemModel[]): Observable<ProductItemModel[]> {
    switch (cacheType) {
      case 'portfolio':
        (this.portfolioCache$ = new ReplaySubject<ProductItemModel[]>(1)).next(this.mapPreviewUri(items));
        return this.portfolioCache$.asObservable();
      case 'shop':
        (this.shopCache$ = new ReplaySubject<ProductItemModel[]>(1)).next(this.mapPreviewUri(items));
        return this.shopCache$;
    }
  }
}
