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
    const previewParams = ['id', 'title', 'preview'];

    switch (route) {
      case 'portfolio':
        if (this.portfolioCache$) {
          return this.portfolioCache$.asObservable();
        }
        return this.createRequest$(this.portfolioUrl, [...previewParams, 'type', 'category'])
          .pipe(flatMap(items => this.initCache$(route, items)));
      case 'shop':
        if (this.shopCache$) {
          return this.shopCache$.asObservable();
        }
        return this.createRequest$(this.shopUrl, [...previewParams, 'current_price', 'base_price', 'sale'])
          .pipe(flatMap(items => this.initCache$(route, items)));
    }
  }

  product(id: number, route: AdminType, type?: string): Observable<ProductItemModel> {
    const params = type ? {params: {type}} : undefined;
    return this.rest.get(this[route + 'Url'] + id, params);
  }

  image(url: string): Observable<any> {
    return this.imageService.get(url);
  }

  shopItem(id: string): Observable<any> {
    return this.rest.get(`orders/${id}/`);
  }

  private createRequest$(url: string, params: string[]): Observable<ProductItemModel[]> {
    return this.rest.get(url, params ? {params: new HttpParams().append('fields', params.join(','))} : undefined)
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
