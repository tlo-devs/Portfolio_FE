export interface PriceModel {
  base_price: number;
  current_price: number;
  currency: string;
  sale?: number;
}
