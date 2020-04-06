import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

import {AuthService} from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  valid = true;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  onSubmit(form: NgForm) {
    form.valid
      ? this.authService.tryLogin(form.value).subscribe(
      jwt => {
        form.reset();
        this.authService.token = jwt.access_token;
        this.router.navigateByUrl('/admin');
      },
      err => {
        form.reset();
        console.log(err);
        this.valid = false;
      },
      () => this.valid = true
      )
      : this.valid = false;
  }
}
