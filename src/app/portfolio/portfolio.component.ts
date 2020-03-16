import {Component, OnInit} from '@angular/core';
import {PortfolioItemModel} from '../_models/portfolio-item-model';
import {PortfolioService} from './portfolio.service';
import {ActivatedRoute, Router} from '@angular/router';
import {flatMap, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  private active: string;
  private category: string;
  parent: string;
  portfolioItems: PortfolioItemModel[];

  constructor(private portfolioService: PortfolioService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params.pipe(
      flatMap(p => {
        this.category = p.category;
        return this.portfolioService.preview();
      })
    ).subscribe(items => {
      this.active = this.route.snapshot.url[0].path;
      this.portfolioItems = this.filterBy(items);
    });
    this.route.parent.url.subscribe(parent => this.parent = parent[0].path);
  }

  toDetails(item: PortfolioItemModel) {
    this.router.navigate([`${this.parent}/${item.type}/${item.category}/${item.id}`]);
  }

  filterBy(items: PortfolioItemModel[]): PortfolioItemModel[] {
    return items.filter(item =>
      this.active === 'all' || (item.type === this.active &&
      (this.category === 'all' || item.category === this.category))
    );
  }

}

const MOCKITEMS = [
  {
    id: 1,
    preview: {
      alt: 'hdrseh',
      uri: 'assets/images/baby-yoda.jpg'
    },
    title: 'erzse'
  },
  {
    id: 2,
    preview: {
      alt: 'aet', uri: 'rdth'
    },
    title: 'erzse'
  },
  {
    id: 3,
    preview: {
      alt: 'hdrseh',
      uri: 'dhrxth'
    },
    title: 'srthgsrg'
  },
  {
    id: 4,
    preview: {
      alt: 'hdrseh',
      uri: 'dhrxth'
    },
    title: 'erzse'
  },
  {
    id: 5,
    preview: {
      alt: 'aet', uri: 'rdth'
    },
    title: 'erzse'
  },
  {
    id: 6,
    preview: {
      alt: 'hdrseh',
      uri: 'dhrxth'
    },
    title: 'srthgsrg'
  },
  {
    id: 7,
    preview: {
      alt: 'hdrseh',
      uri: 'dhrxth'
    },
    title: 'erzse'
  },
  {
    id: 8,
    preview: {
      alt: 'aet', uri: 'rdth'
    },
    title: 'erzse'
  },
  {
    id: 9,
    preview: {
      alt: 'hdrseh',
      uri: 'dhrxth'
    },
    title: 'srthgsrg'
  },
  {
    id: 10,
    preview: {
      alt: 'hdrseh',
      uri: 'dhrxth'
    },
    title: 'erzse'
  },
  {
    id: 11,
    preview: {
      alt: 'aet', uri: 'rdth'
    },
    title: 'erzse'
  },
  {
    id: 12,
    preview: {
      alt: 'hdrseh',
      uri: 'dhrxth'
    },
    title: 'srthgsrg'
  },
  {
    id: 13,
    preview: {
      alt: 'hdrseh',
      uri: 'dhrxth'
    },
    title: 'erzse'
  },
  {
    id: 14,
    preview: {
      alt: 'aet', uri: 'rdth'
    },
    title: 'erzse'
  },
  {
    id: 15,
    preview: {
      alt: 'hdrseh',
      uri: 'dhrxth'
    },
    title: 'srthgsrg'
  },
  {
    id: 16,
    preview: {
      alt: 'hdrseh',
      uri: 'gfgfg'
    },
    title: 'erzse'
  },
  {
    id: 17,
    preview: {
      alt: 'aet', uri: 'rdth'
    },
    title: 'erzse'
  },
  {
    id: 18,
    preview: {
      alt: 'hdrseh',
      uri: 'dhrxth'
    },
    title: 'srthgsrg'
  }
];
