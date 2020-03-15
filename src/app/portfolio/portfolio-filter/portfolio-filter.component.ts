import { Component, OnInit } from '@angular/core';
import {PortfolioFilterModel} from '../../_models/portfolio-filter.model';

@Component({
  selector: 'app-portfolio-filter',
  templateUrl: './portfolio-filter.component.html',
  styleUrls: ['./portfolio-filter.component.scss']
})
export class PortfolioFilterComponent implements OnInit {

  filters: PortfolioFilterModel[] = [
    {name: 'all', key: 'all'},
    {name: 'videos', key: 'videos'},
    {name: 'images', key: 'images'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
