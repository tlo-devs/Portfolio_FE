import {ProductItemType} from './product-item.type';

export interface ProductItemModel {
  id?: number;
  title: string;
  type?: ProductItemType;
  preview?: Array<{alt: string, uri: string} | string> | {alt: string, uri: string} | string;
  category?: string;
  content?: Array<{alt: string, uri: string} | string> | {alt: string, uri: string} | string;
  year?: number;
  client?: string;
  description?: string;
  sales?: string;
  price?: string;
  oldPrice?: string;
}


