export interface ProductFilterModel {
  key: string;
  name: string;
  children?: ProductFilterModel[];
}
