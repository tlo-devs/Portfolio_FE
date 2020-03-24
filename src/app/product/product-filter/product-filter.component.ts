import {Component, Input, OnInit} from '@angular/core';
import {ProductFilterModel} from '../../_models/product-filter.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit {

  // parent is only portfolio right now but it can be used to have the component work on multiple pages
  @Input() private parent: string;

  width: number;
  active: string;
  selected = false;

  types: ProductFilterModel[] = [
    {
      name: 'alles',
      key: 'all',
      categories: []
    },
    {
      name: 'videos',
      key: 'video',
      categories: [
        {name: 'alles', key: 'all'},
        {name: 'Imagevideos', key: 'imagevideo'},
        {name: 'Aftermovies', key: 'aftermovie'},
        {name: 'Kurzfilme', key: 'shortmovie'},
        {name: 'Musikvideos', key: 'musicvideo'}
      ]
    },
    {
      name: 'bilder',
      key: 'image',
      categories: [
        {name: 'alles', key: 'all'},
        {name: 'Landschaftsphotographie', key: 'landscape'},
        {name: 'Architektur', key: 'architecture'},
        {name: 'Portraits', key: 'portrait'}
      ]
    }
  ];

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
    return this.types.find(t => t.key === this.active).categories;
  }
}
