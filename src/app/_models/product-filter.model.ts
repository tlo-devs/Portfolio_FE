export interface ProductFilterModel {
  key: string;
  name: string;
  categories?: ProductFilterModel[];
}
