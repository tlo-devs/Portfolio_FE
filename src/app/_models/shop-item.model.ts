import {PriceModel} from './price.model';
import {ProductItemModel} from './product-item.model';
import {ShopItemType} from './shop-item-type';

export interface ShopItemModel extends ProductItemModel {
  type: ShopItemType;
  images: ShopImageModel[];
  price: PriceModel;
}

export interface ShopImageModel {
  image_before: string;
  image_after: string;
}
