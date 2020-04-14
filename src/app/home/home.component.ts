import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { SocialModel } from '../_models/social.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  @ViewChild('video', { static: false }) private video: ElementRef;

  socialLinks: SocialModel[] = [
    {
      name: 'Instagram',
      ref: 'https://www.instagram.com/11sevendome/',
      src: 'instagram.png'
    },
    {
      name: 'YouTube',
      ref: 'https://www.youtube.com/channel/UCiptfcvb-m5wErL_0Cx2A-A/',
      src: 'youtube.png'
    },
    {
      name: 'Spotify',
      ref: 'https://open.spotify.com/user/21lji7srmfwjcgsnwu4nfsj2a/',
      src: 'spotify.png'
    }
  ];


  ngAfterViewInit(): void {
    this.video.nativeElement.muted = 'muted';
    this.video.nativeElement.autoplay = 'autoplay';
    this.video.nativeElement.loop = 'loop';
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

  isMobile(): boolean {
    return window.innerWidth < 992;
  }
}
