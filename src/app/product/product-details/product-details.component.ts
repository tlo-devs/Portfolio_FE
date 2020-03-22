import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductItemModel} from '../../_models/product-item.model';
import {NgbCarousel} from '@ng-bootstrap/ng-bootstrap';
import {ProductService} from '../product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, AfterViewInit {

  product: ProductItemModel;

  @ViewChild('carousel', {static: false}) carousel: NgbCarousel;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.product = this.route.snapshot.data.product[0];
  }

  ngAfterViewInit(): void {
    this.carousel.pause();
  }

}
