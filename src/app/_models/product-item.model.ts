import {ProductItemType} from './product-item.type';

export interface ProductItemModel {
  id: number;
  title: string;
  type?: ProductItemType;
  preview?: {alt: string, uri: string};
  category?: string;
  content?: {alt: string, uri: string}[];
  year?: number;
  client?: string;
  description?: string;

}


