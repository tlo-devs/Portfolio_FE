import {Component, OnInit} from '@angular/core';
import {SocialModel} from '../_models/social-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  socialLinks: SocialModel[] = [
    {
      name: 'Instagram',
      ref: 'https://www.instagram.com/',
      src: 'instagram.png'
    },
    {
      name: 'YouTube',
      ref: 'https://www.youtube.com/',
      src: 'youtube.png'
    },
    {
      name: 'Spotify',
      ref: 'https://www.spotify.com/',
      src: 'spotify.png'
    }
  ];

  constructor() {
  }

  ngOnInit() {
  }

  hover(name: string, transition: 'over' | 'out') {
    let src: string;
    switch (transition) {
      case 'over':
        src = name.toLowerCase() + '-colored.png';
        break;
      case 'out':
        src = name.toLowerCase() + '.png';
        break;
    }
    this.socialLinks.find(link => link.name === name).src = src;
  }

}
