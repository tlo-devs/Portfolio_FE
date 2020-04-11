import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductItemModel} from '../../_models/product-item.model';
import {NgbCarousel} from '@ng-bootstrap/ng-bootstrap';
import {ProductService} from '../product.service';
import {DomSanitizer} from '@angular/platform-browser';
import {AdminType} from '../../_models/admin-type.type';
import {IPayPalConfig} from 'ngx-paypal';
import {ValidationModel} from '../../_models/validation.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, AfterViewInit, OnDestroy {

  private shopTimeout;
  validation: ValidationModel = {finished: false};
  shopItem: { rel?: string, expiry: number, tries: number };
  payPalConfig: IPayPalConfig;
  product: ProductItemModel;
  parent: AdminType;

  @ViewChild('carousel', {static: false}) carousel: NgbCarousel;

  constructor(private route: ActivatedRoute,
              private sanitizer: DomSanitizer,
              private productService: ProductService) {
  }

  ngOnInit() {
    this.product = this.route.snapshot.data.product;
    this.parent = this.route.snapshot.parent.url[0].path as AdminType;

    if (this.parent === 'shop') {
      if (this.checkExpiry()) {
        this.shopItem = undefined;
        localStorage.removeItem('shopItem');
      }
      if (localStorage.shopItem) {
        this.shopItem = JSON.parse(localStorage.shopItem);
        this.shopTimeout = setTimeout(() => {
          this.shopItem = undefined;
          localStorage.removeItem('shopItem');
        }, this.shopItem.expiry - Date.now());
      }
      this.initConfig();
    }
  }

  ngAfterViewInit(): void {
    if (this.carousel) {
      this.carousel.pause();
    }
  }

  ngOnDestroy() {
    clearTimeout(this.shopTimeout);
  }

  private initConfig(): void {
    this.payPalConfig = {
      clientId: 'sb',
      // clientId: 'Adh7EP-GFNYIU6Ly0-SNHiUGxZL3bMBuVzwf6Vw3ZJ4ekTIvj6meOiU31pftJkCdxTzJlyG_d6rfyjcK',
      advanced: {extraQueryParams: [{name: 'disable-funding', value: 'card'}]},
      style: {label: 'pay'},
      createOrderOnServer: () => {
        this.validation.started = true;
        this.validation.alert = 'Processing...';
        return fetch(`/api/shop/${this.product.id}/payment/`)
          .then((res) => res.json())
          .then((order) => order.orderID);
      },
      onClientAuthorization: data => {
        this.productService.shopItem(data.id).subscribe(
          rel => {
            this.shopItem = {rel, expiry: Date.now() + 21600000, tries: 2};
            this.finishValidation(true,
              'Transaction successful. Click the button below to start downloading the product.');
            localStorage.setItem('shopItem', JSON.stringify(this.shopItem));
          },
          err => this.finishValidation(false, err.error.message)
        );
      },
      onCancel: () => this.validation = {finished: false},
      onError: err => this.finishValidation(false, err.error.message),
      onClick: () => this.validation.started = true,
    };
  }

  // id string
  createUrl(id: any) {
    const url = `//www.youtube.com/embed/${id}?origin=http://localhost:4200/&rel=0`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  private finishValidation(value: boolean, alert: string) {
    this.validation = {...this.validation, started: false, finished: true, value, alert};
  }

  private checkExpiry(): boolean {
    if (!this.shopItem) {
      return true;
    }
    return Date.now() > this.shopItem.expiry || this.shopItem.tries === 0;
  }

  downloadItem() {
    if (!this.checkExpiry()) {
      window.open(this.shopItem.rel, '_blank');
      this.shopItem.tries--;
      localStorage.setItem('shopItem', JSON.stringify(this.shopItem));
    } else {
      this.shopItem = undefined;
      localStorage.removeItem('shopItem');
    }
  }
}
