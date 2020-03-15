import {Component, Input, OnInit} from '@angular/core';
import {PortfolioFilterModel} from '../../_models/portfolio-filter.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-portfolio-filter',
  templateUrl: './portfolio-filter.component.html',
  styleUrls: ['./portfolio-filter.component.scss']
})
export class PortfolioFilterComponent implements OnInit {

  @Input() private parent: string;

  width: number;
  active: string;
  selected = false;

  types: PortfolioFilterModel[] = [
    {
      name: 'all',
      key: 'all',
      categories: []
    },
    {
      name: 'videos',
      key: 'video',
      categories: [
        {name: 'all', key: 'all'},
        {name: 'landscape', key: 'landscape'},
        {name: 'portrait', key: 'portrait'},
        {name: 'architecture', key: 'architecture'}
      ]
    },
    {
      name: 'images',
      key: 'image',
      categories: [
        {name: 'all', key: 'all'},
        {name: 'landscape', key: 'landscape'},
        {name: 'portrait', key: 'portrait'},
        {name: 'architecture', key: 'architecture'}
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

  categories(): PortfolioFilterModel[] {
    return this.types.find(t => t.key === this.active).categories;
  }
}
