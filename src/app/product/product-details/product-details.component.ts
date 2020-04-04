import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductItemModel} from '../../_models/product-item.model';
import {NgbCarousel} from '@ng-bootstrap/ng-bootstrap';
import {ProductService} from '../product.service';
import {DomSanitizer} from '@angular/platform-browser';
import {AdminType} from '../../_models/admin-type.type';
import {ICreateOrderRequest, IPayPalConfig} from 'ngx-paypal';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, AfterViewInit {

  payPalConfig: IPayPalConfig;
  product: ProductItemModel;
  parent: AdminType;

  @ViewChild('carousel', {static: false}) carousel: NgbCarousel;

  constructor(private route: ActivatedRoute,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.product = this.route.snapshot.data.product;
    this.parent = this.route.snapshot.parent.url[0].path as AdminType;

    if (this.parent === 'shop') {
      this.initConfig();
    }
  }

  private initConfig(): void {
    this.payPalConfig = {
      clientId: 'Adh7EP-GFNYIU6Ly0-SNHiUGxZL3bMBuVzwf6Vw3ZJ4ekTIvj6meOiU31pftJkCdxTzJlyG_d6rfyjcK',
      advanced: {extraQueryParams: [{name: 'disable-funding', value: 'card'}]},
      style: {label: 'pay'},
      createOrderOnServer: () => fetch(`/api/shop/${this.product.id}/payment/`)
        .then((res) => res.json())
        .then((order) => order.orderID),
      onApprove: (data, actions) => {
        console.warn('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          console.warn('onApprove - you can get full order details inside onApprove: ', details);
        });

      },
      onClientAuthorization: (data) => {
        console.warn('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      },
      onCancel: (data, actions) => {
        console.warn('OnCancel', data, actions);

      },
      onError: err => {
        console.error('OnError', err);
      },
      onClick: (data, actions) => {
        console.warn('onClick', data, actions);
      },
    };
  }

  ngAfterViewInit(): void {
    if (this.carousel) {
      this.carousel.pause();
    }
  }

  createUrl(id: any) {
    const url = `//www.youtube.com/embed/${id}?origin=http://localhost:4200/&rel=0`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
