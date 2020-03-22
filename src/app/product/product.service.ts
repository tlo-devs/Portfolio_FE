import {Injectable} from '@angular/core';
import {RestService} from '../_shared/rest.service';
import {Observable, ReplaySubject} from 'rxjs';
import {ProductItemModel} from '../_models/product-item.model';
import {HttpParams} from '@angular/common/http';
import {flatMap} from 'rxjs/operators';
import {ImageService} from '../_shared/image.service';

@Injectable()
export class ProductService {

  private readonly url = 'portfolio/';

  previewCache$: ReplaySubject<ProductItemModel[]>;

  constructor(private rest: RestService,
              private imageService: ImageService) {
  }

  preview(): Observable<ProductItemModel[]> {
    if (!this.previewCache$) {
      const previewParams = ['id', 'title', 'preview', 'type', 'category'];
      const params = {params: new HttpParams().append('fields', previewParams.join(','))};
      return this.rest.get(this.url, params).pipe(flatMap(items => {
        this.previewCache$ = new ReplaySubject<ProductItemModel[]>(1);
        this.previewCache$.next(items);
        return this.previewCache$;
      }));
    }
    return this.previewCache$;
  }

  product(id: number, type: string): Observable<ProductItemModel> {
    return this.rest.get(this.url + id, {params: {type}});
  }

  image(url: string): Observable<any> {
    return this.imageService.get(url);
  }

}
