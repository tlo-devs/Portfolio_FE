import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductItemModel} from '../../_models/product-item.model';
import {NgbCarousel} from '@ng-bootstrap/ng-bootstrap';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, AfterViewInit {

  product: ProductItemModel;

  @ViewChild('carousel', {static: false}) carousel: NgbCarousel;

  constructor(private route: ActivatedRoute,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.product = this.route.snapshot.data.product;
  }

  ngAfterViewInit(): void {
    if (this.carousel) {
      this.carousel.pause();
    }
  }

  createUrl(id: string) {
    const url = `//www.youtube.com/embed/${id}?origin=http://localhost:4200/&rel=0`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
