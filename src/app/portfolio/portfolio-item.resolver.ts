import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable, of} from 'rxjs';
import {PortfolioItemModel} from '../_models/portfolio-item-model';
import {PortfolioService} from './portfolio.service';

@Injectable()
export class PortfolioItemResolver implements Resolve<PortfolioItemModel> {

  constructor(private portfolioService: PortfolioService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<PortfolioItemModel> {
    // return this.portfolioService.portfolio(route.params.id);
    // fixme mock
    return of({
      id: route.params.id,
      preview: {
        alt: 'hdrseh',
        uri: 'dhrxth'
      },
      title: 'srthgsrg'
    });
  }
}
