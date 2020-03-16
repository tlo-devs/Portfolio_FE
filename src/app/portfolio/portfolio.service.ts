import {Injectable} from '@angular/core';
import {RestService} from '../_core/rest.service';
import {Observable, ReplaySubject} from 'rxjs';
import {PortfolioItemModel} from '../_models/portfolio-item-model';
import {HttpParams} from '@angular/common/http';
import {flatMap} from 'rxjs/operators';

@Injectable()
export class PortfolioService {

  private readonly url = 'portfolio/';

  previewCache$: ReplaySubject<PortfolioItemModel[]>;

  constructor(private rest: RestService) {
  }

  preview(): Observable<PortfolioItemModel[]> {
    if (!this.previewCache$) {
      const previewParams = ['id', 'title', 'preview', 'type', 'category'];
      const params = {params: new HttpParams().append('fields', previewParams.join(','))};
      return this.rest.get(this.url, params).pipe(flatMap(items => {
        this.previewCache$ = new ReplaySubject<PortfolioItemModel[]>(1);
        this.previewCache$.next(items);
        return this.previewCache$;
      }));
    }
    return this.previewCache$;
  }

  portfolio(id: number): Observable<PortfolioItemModel> {
    return this.rest.get(this.url + id);
  }

}
