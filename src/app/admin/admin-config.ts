
export class AdminConfig {

  private static readonly PORTFOLIO_CONFIG = {

  };
  private static readonly SHOP_CONFIG = {};

  static get portfolioConfig(): any {
    return this.PORTFOLIO_CONFIG;
  }

  static get shopConfig(): any {
    return this.SHOP_CONFIG;
  }
}
