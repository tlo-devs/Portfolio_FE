import {PriceModel} from './price.model';
import {ProductItemModel} from './product-item.model';

export interface ShopItemModel extends ProductItemModel {
  images: ShopImageModel[];
  price: PriceModel;
}

interface ShopImageModel {
  image_before: string;
  image_after: string;
}
