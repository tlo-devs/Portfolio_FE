import { Injectable } from '@angular/core';
import {RestService} from '../_core/rest.service';
import {Observable} from 'rxjs';
import {PortfolioItemModel} from '../_models/portfolio-item-model';
import {HttpParams} from '@angular/common/http';

@Injectable()
export class PortfolioService {

  private readonly url = 'portfolio/';

  constructor(private rest: RestService) { }

  preview(): Observable<PortfolioItemModel[]> {
    const previewParams = ['id', 'title', 'preview', 'type', 'category'];
    const params = {params: new HttpParams().append('fields', previewParams.join(','))};
    return this.rest.get(this.url, params);
  }

  portfolio(id: number): Observable<PortfolioItemModel> {
    return this.rest.get(this.url + id);
  }

}
