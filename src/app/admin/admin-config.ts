import {AdminType} from '../_models/admin-type.type';

export class AdminConfig {

  static type: AdminType;

  private static readonly PORTFOLIO_CONFIG = {
    image: {accept: 'image/x-png'}
  };
  private static readonly SHOP_CONFIG = {
    image: {accept: 'image/x-png'}
  };

  static get portfolioConfig(): any {
    return this.PORTFOLIO_CONFIG;
  }

  static get shopConfig(): any {
    return this.SHOP_CONFIG;
  }
}
