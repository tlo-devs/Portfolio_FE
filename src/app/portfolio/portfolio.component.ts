import {Component, OnInit} from '@angular/core';
import {PortfolioItemModel} from '../_models/portfolio-item-model';
import {PortfolioService} from './portfolio.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  portfolioItems: PortfolioItemModel[];

  constructor(private portfolioService: PortfolioService) {
  }

  ngOnInit() {
    this.portfolioService.preview().subscribe(items => {
      this.portfolioItems = items;
      MOCKITEMS.forEach(i => this.portfolioItems.push(i));
    });
    // fixme
    this.portfolioItems = MOCKITEMS;
  }

}

const MOCKITEMS = [
  {
    id: 1,
    preview: {
      alt: 'hdrseh',
      uri: 'dhrxth'
    },
    title: 'erzse'
  },
  {
    id: 1,
    preview: {
      alt: 'aet', uri: 'rdth'
    },
    title: 'erzse'
  },
  {
    id: 1,
    preview: {
      alt: 'hdrseh',
      uri: 'dhrxth'
    },
    title: 'srthgsrg'
  }
];
