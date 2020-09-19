import {Injectable} from '@angular/core';
import {RestService} from '../_shared/rest.service';
import {Observable, of} from 'rxjs';
import {AboutModel} from '../_models/about/about.model';

@Injectable()
export class AboutService {

  constructor(private rest: RestService) {
  }

  content$(): Observable<AboutModel> {
    return of({
      img: '../../assets/images/about.jpg',
      about: [
        {
          title: 'Hauptberuf',
          text: 'Videoeditor/Fotograf'
        },
        {
          title: 'Zahlreiche Erfahrungen als',
          text: 'Kameramann, Lichtassistent, Cutter'
        }
      ],
      vita: [
        {
          year: '2018',
          text: 'Ausbildung als Mediengestalter Bild und Ton'
        },
        {
          year: '2018',
          text: 'Studium Maschinenbau'
        },
        {
          year: '2017',
          text: 'Abitur (Brandenburg)'
        },
        {
          year: '2014',
          text: 'FSJ als Krankenpfleger'
        }
      ]
    });
  }
}
