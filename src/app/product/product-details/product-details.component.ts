import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductItemModel} from '../../_models/product-item.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  portfolio: ProductItemModel;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.portfolio = this.route.snapshot.data.portfolioItem;
  }

}
