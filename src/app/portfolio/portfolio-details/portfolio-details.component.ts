import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PortfolioItemModel} from '../../_models/portfolio-item-model';

@Component({
  selector: 'app-portfolio-details',
  templateUrl: './portfolio-details.component.html',
  styleUrls: ['./portfolio-details.component.scss']
})
export class PortfolioDetailsComponent implements OnInit {

  portfolio: PortfolioItemModel;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.portfolio = this.route.snapshot.data.portfolioItem;
    console.log(this.portfolio);
  }

}
