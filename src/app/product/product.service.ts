import {Injectable} from '@angular/core';
import {RestService} from '../_shared/rest.service';
import {Observable, ReplaySubject} from 'rxjs';
import {ProductItemModel} from '../_models/product-item.model';
import {HttpParams} from '@angular/common/http';
import {flatMap} from 'rxjs/operators';
import {ImageService} from '../_shared/image.service';
import {environment} from '../../environments/environment';
import {AdminType} from '../_models/admin-type.type';

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
    if (!this[route + 'Cache$']) {

      const previewParams = route === 'portfolio'
        ? ['id', 'title', 'preview', 'type', 'category']
        : ['id', 'title', 'preview', 'current_price', 'base_price', 'sale'];

      const params = {params: new HttpParams().append('fields', previewParams.join(','))};
      return this.rest.get(this[route + 'Url'], params).pipe(flatMap(items => {
        this[route + 'Cache$'] = new ReplaySubject<ProductItemModel[]>(1);
        items = items.map(item => {
          // surpressed because there is uri on preview
          // @ts-ignore
          item.preview.uri = environment.imgUrl + item.preview.uri;
          return item;
        });
        this[route + 'Cache$'].next(items);
        return this[route + 'Cache$'] as Observable<ProductItemModel[]>;
      }));
    }
    return this[route + 'Cache$'] as Observable<ProductItemModel[]>;
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

}
