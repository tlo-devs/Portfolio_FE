import { Component, OnInit } from '@angular/core';
import {fromEvent} from 'rxjs';
import {auditTime} from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  width: number;

  constructor() { }

  ngOnInit() {
    this.width = window.innerWidth;
    fromEvent(window, 'resize').pipe(
      auditTime(150)
    ).subscribe(() => this.width = window.innerWidth);
  }

}
