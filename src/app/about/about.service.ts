import {Injectable} from '@angular/core';
import {RestService} from '../_shared/rest.service';
import {Observable, of} from 'rxjs';
import {AboutModel} from '../_models/about/about.model';

@Injectable()
export class AboutService {

  private aboutUrl = 'content/about/';

  constructor(private rest: RestService) {
  }

  content$(): Observable<AboutModel> {
    return this.rest.get<AboutModel>(this.aboutUrl);
  }
}
