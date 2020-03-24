import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductItemModel} from '../../_models/product-item.model';
import {NgbCarousel} from '@ng-bootstrap/ng-bootstrap';
import {ProductService} from '../product.service';
import {DomSanitizer} from '@angular/platform-browser';
import {AdminType} from '../../_models/admin-type.type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, AfterViewInit {

  product: ProductItemModel;
  parent: AdminType;

  @ViewChild('carousel', {static: false}) carousel: NgbCarousel;

  constructor(private route: ActivatedRoute,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.product = this.route.snapshot.data.product;
    this.parent = this.route.snapshot.parent.url[0].path as AdminType;
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
