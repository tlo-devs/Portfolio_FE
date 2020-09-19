import {AboutContentModel} from './about-content.model';
import {VitaModel} from './vita.model';

export interface AboutModel {
  img: string;
  about: AboutContentModel[];
  vita: VitaModel[];
}

