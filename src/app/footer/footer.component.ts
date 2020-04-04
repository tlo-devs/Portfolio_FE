import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  readonly contactValues: {type: string, contact: string}[] = [
    { type: 'Tel.', contact: '015229259032' },
    { type: 'E-mail', contact: '11sevenDome@gmx.de' }
  ];

  readonly linkValues: {name: string, ref: string}[] = [
    { name: 'about', ref: '/about' },
    { name: 'impressum', ref: '/impressum' },
    { name: 'datenschutz', ref: '/data-protection' }
  ];
}
