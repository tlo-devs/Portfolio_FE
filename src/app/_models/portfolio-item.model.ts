import {ProductItemModel} from './product-item.model';
import {ProductItemType} from './product-item.type';

export interface PortfolioItemModel extends ProductItemModel {
  type: ProductItemType;
  category: string;
  year: number;
  client: string;

  // images for image item, video for video item
  images?: PortfolioImageModel[];
  video?: string;
}

interface PortfolioImageModel {
  image: string;
}
