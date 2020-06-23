import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html'
})
export class ShopComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  toDetails(itemId: string) {
    this.router.navigate([`shop/all/digital/${itemId}`]);
  }


}
