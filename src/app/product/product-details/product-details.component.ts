import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductItemModel} from '../../_models/product-item.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: ProductItemModel;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.product = this.route.snapshot.data.product[0];
    // fixme MOCK
    this.product.content = [
      ...this.product.content,
      {uri: 'sdsf', alt: 'sds'},
      {uri: 'sdsf', alt: 'sds'},
      {uri: 'sdsf', alt: 'sds'}
    ];
  }

}
