import {Component, Input, OnInit} from '@angular/core';
import {ProductFilterModel} from '../../_models/product-filter.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit {

  @Input() productFilters: ProductFilterModel[];
  @Input() private parent: string;

  width: number;
  active: string;
  selected = false;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.width = window.innerWidth;
    this.active = this.route.snapshot.url[0].path;
  }

  changeType(type: string): string {
    return `/${this.parent}/${type}`;
  }

  changeCategory(category: string): string {
    return `/${this.parent}/${this.active}/${category}`;
  }

  categories(): ProductFilterModel[] {
    return this.productFilters.find(t => t.key === this.active).children || [];
  }
}
