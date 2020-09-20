import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AboutService} from './about.service';
import {AboutModel} from '../_models/about/about.model';
import {AboutContentModel} from '../_models/about/about-content.model';
import {VitaModel} from '../_models/about/vita.model';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements OnInit {

  private aboutItems: AboutModel;

  constructor(private aboutService: AboutService,
              private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.aboutService.content$().subscribe(items => {
      this.aboutItems = items;
      this.cdr.detectChanges();
    });
  }

  get about(): AboutContentModel[] {
    return this.aboutItems?.about || [];
  }

  get vita(): VitaModel[] {
    return this.aboutItems?.vita || [];
  }

  get srcImage(): string {
    return this.aboutItems?.img;
  }
}
