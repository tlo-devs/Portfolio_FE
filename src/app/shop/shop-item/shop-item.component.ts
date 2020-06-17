import {Component, OnDestroy, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {ShopItemModel} from '../../_models/shop-item.model';
import {ValidationModel} from '../../_models/validation.model';
import {IPayPalConfig} from 'ngx-paypal';
import {ProductItemModel} from '../../_models/product-item.model';
import {ActivatedRoute} from '@angular/router';
import {ShopService} from '../shop.service';

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.scss']
})
export class ShopItemComponent implements OnInit, OnDestroy {

  validation: ValidationModel = {finished: false};
  payPalConfig: IPayPalConfig;
  product: ProductItemModel;
  private shopTimeout;
  // tslint:disable-next-line:variable-name
  private shop_item: ShopItemModel;

  constructor(private route: ActivatedRoute, private shopService: ShopService) {
  }

  ngOnInit(): void {
    this.product = this.route.snapshot.data.product;
    if (localStorage['shop_item_' + this.product.id]) {
      this.shopItem = JSON.parse(localStorage['shop_item_' + this.product.id]);
      if (this.checkExpiry()) {
        this.shopItem = undefined;
        localStorage.removeItem('shop_item_' + this.product.id);
        return;
      }
      this.shopTimeout = setTimeout(() => {
        this.shopItem = undefined;
        localStorage.removeItem('shop_item_' + this.product.id);
      }, this.shopItem.expiry - Date.now());
    }
    this.initConfig();
  }

  ngOnDestroy() {
    clearTimeout(this.shopTimeout);
  }

  downloadItem() {
    if (!this.checkExpiry()) {
      window.open(environment.apiUrl + 'orders/download/' + this.shopItem.rel, '_blank');
      this.shopItem.tries--;
      localStorage.setItem('shop_item_' + this.product.id, JSON.stringify(this.shopItem));
    } else {
      this.shopItem = undefined;
      localStorage.removeItem('shop_item_' + this.product.id);
    }
  }

  private initConfig(): void {
    this.payPalConfig = {
      clientId: 'Adh7EP-GFNYIU6Ly0-SNHiUGxZL3bMBuVzwf6Vw3ZJ4ekTIvj6meOiU31pftJkCdxTzJlyG_d6rfyjcK',
      currency: 'EUR',
      advanced: {extraQueryParams: [{name: 'disable-funding', value: 'sepa'}]},
      style: {label: 'pay'},
      createOrderOnServer: () => {
        this.validation.started = true;
        this.validation.alert = 'Processing...';
        return fetch(environment.apiUrl + `shop/${this.product.id}/payment/`)
          .then((res) => res.json())
          .then((order) => order.order_id);
      },
      onClientAuthorization: data => {
        this.shopService.shopItem$<string>(data.id).subscribe(
          rel => {
            this.shopItem = {rel, expiry: Date.now() + 21600000, tries: 2};
            this.finishValidation(true,
              'Transaction successful. Click the button below to start downloading the product.');
            localStorage.setItem('shop_item_' + this.product.id, JSON.stringify(this.shopItem));
          },
          err => this.finishValidation(false, err.error.message)
        );
      },
      onCancel: () => this.validation = {finished: false},
      onError: err => this.finishValidation(false, err.error.message),
      onClick: () => this.validation.started = true,
    };
  }

  private finishValidation(value: boolean, alert: string) {
    this.validation = {...this.validation, started: false, finished: true, value, alert};
  }

  private checkExpiry(): boolean {
    if (!this.shopItem) {
      return true;
    }
    return Date.now() > this.shopItem.expiry || this.shopItem.tries <= 0;
  }

  get downloadExpiry(): Date {
    return new Date(this.shopItem.expiry);
  }

  get shopItem(): ShopItemModel {
    return this.shop_item;
  }

  set shopItem(value: ShopItemModel) {
    this.shop_item = value;
  }
}
