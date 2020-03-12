import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  readonly contactValues: {type: string, contact: string}[] = [
    { type: 'E-mail', contact: 'foo@bar.com' },
    { type: 'Phone', contact: '+496969420' },
    {  type: 'Something', contact: 'Some contact'}
  ];

  readonly linkValues: {name: string, ref: string}[] = [
    { name: 'about', ref: '#' },
    { name: 'impressum', ref: '#' },
    { name: 'datenschutz', ref: '#' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
