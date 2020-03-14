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
      uri: 'dhrxth'
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
