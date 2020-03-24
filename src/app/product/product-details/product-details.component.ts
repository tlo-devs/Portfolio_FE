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

  paypalConfig: IPayPalConfig;
  product: ProductItemModel;
  parent: AdminType;

  @ViewChild('carousel', {static: false}) carousel: NgbCarousel;

  constructor(private route: ActivatedRoute,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.product = this.route.snapshot.data.product;
    this.parent = this.route.snapshot.parent.url[0].path as AdminType;

    if (this.parent === 'shop') {
      this.initConfig();
    }
  }

  private initConfig(): void {
    this.paypalConfig = {
      currency: 'EUR',
      clientId: 'sb',
      // tslint:disable-next-line:no-angle-bracket-type-assertion
      createOrderOnClient: (data) => <ICreateOrderRequest> {
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'EUR',
              value: this.product.current_price,
              breakdown: {
                item_total: {
                  currency_code: 'EUR',
                  value: this.product.current_price
                }
              }
            },
            items: [
              {
                name: this.product.title,
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'EUR',
                  value: this.product.current_price,
                },
              }
            ]
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
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
