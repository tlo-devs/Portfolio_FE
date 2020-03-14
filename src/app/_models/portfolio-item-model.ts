import {PortfolioItemType} from './portfolio-item-type';

export interface PortfolioItemModel {
  id: number;
  title: string;
  type?: PortfolioItemType;
  preview?: {alt: string, uri: string};
  category?: string;
  content?: string[];
  year?: number;
  client?: string;
  description?: string;

}


