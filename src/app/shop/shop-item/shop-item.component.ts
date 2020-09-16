import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {environment} from '../../../environments/environment';
import {ShopStateModel} from '../../_models/shop-state.model';
import {ValidationModel} from '../../_models/validation.model';
import {IPayPalConfig} from 'ngx-paypal';
import {ActivatedRoute} from '@angular/router';
import {ShopService} from '../shop.service';
import {ShopImageModel, ShopItemModel} from '../../_models/shop-item.model';
import {NgbCarousel} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.scss']
})
export class ShopItemComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('carousel', {static: false}) carousel: NgbCarousel;
  @ViewChild('beforeImg', {static: false}) beforeImg: ElementRef;

  validation: ValidationModel = {finished: false};
  payPalConfig: IPayPalConfig;
  product: ShopItemModel;
  activeImages: ShopImageModel;
  private dragging: boolean;
  private shopTimeout;
  // tslint:disable-next-line:variable-name
  private shop_item: ShopStateModel;

  constructor(private route: ActivatedRoute, private shopService: ShopService) {
  }

  ngOnInit(): void {
    this.product = this.route.snapshot.data.product;
    this.activeImages = this.product.images[0];
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

  ngAfterViewInit(): void {
    if (this.carousel) {
      this.carousel.pause();
    }
  }

  ngOnDestroy() {
    clearTimeout(this.shopTimeout);
  }

  onDragStart(event: PointerEvent): void {
    const target = event.target as HTMLDivElement;
    this.beforeImg.nativeElement.style.transition = '';
    target.style.transition = '';
    target.setPointerCapture(event.pointerId);
    this.dragging = true;
  }

  onDrag(event: MouseEvent): void {
    if (!this.dragging) {
      return;
    }
    const target = (event.target as HTMLDivElement);
    const parent = (target.offsetParent as HTMLElement);
    const position = event.x - parent.offsetLeft;

    // offsetWidth - 4 to eliminate a small visual bug and make the slider stop similarly on both sides
    if (position <= 0 || position >= parent.offsetWidth - 4) {
      return;
    }
    this.setSliderPosition(target, position + 'px');
  }

  onDragEnd(event: PointerEvent): void {
    const target = event.target as HTMLDivElement;
    this.resetSlider(target);
    target.releasePointerCapture(event.pointerId);
    this.dragging = false;
  }

  chooseImage(item: ShopImageModel): void {
    this.activeImages = item;
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

  private setSliderPosition(target: HTMLDivElement, value: string): void {
    this.beforeImg.nativeElement.style.width = value;
    target.style.left = value;
  }

  private resetSlider(target: HTMLDivElement): void {
    this.beforeImg.nativeElement.style.transition = 'width 1s ease-in-out';
    target.style.transition = 'left 1s ease-in-out';
    setTimeout(() => {
      this.beforeImg.nativeElement.style.transition = '';
      target.style.transition = '';
    }, 1000);
    this.setSliderPosition(target, '');
  }

  private initConfig(): void {
    this.payPalConfig = {
      clientId: 'Adh7EP-GFNYIU6Ly0-SNHiUGxZL3bMBuVzwf6Vw3ZJ4ekTIvj6meOiU31pftJkCdxTzJlyG_d6rfyjcK',
      currency: this.product.price.currency,
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

  get shopItem(): ShopStateModel {
    return this.shop_item;
  }

  set shopItem(value: ShopStateModel) {
    this.shop_item = value;
  }
}
