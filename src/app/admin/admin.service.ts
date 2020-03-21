import { Injectable } from '@angular/core';
import {RestService} from '../_shared/rest.service';
import {ProductItemModel} from '../_models/product-item.model';
import {Observable} from 'rxjs';
import {AdminType} from '../_models/admin-type.type';

type FileType = 'image' | 'video';

@Injectable()
export class AdminService {

  private readonly portfolioUrl = 'portfolio/';
  private readonly shopUrl = 'shop/';

  constructor(private rest: RestService) { }

  post(route: AdminType, body, fileType: FileType): Observable<ProductItemModel> {
    return this.rest.post(this[route + 'Url'], body, {params: {type: fileType}});
  }

  get(route: AdminType): Observable<ProductItemModel[]> {
    return this.rest.get(this[route + 'Url']);
  }

}
