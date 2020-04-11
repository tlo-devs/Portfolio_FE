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
  message: string;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.authService.tryLogin(form.value).subscribe(
        jwt => {
          form.reset();
          this.authService.token = jwt.access_token;
          this.router.navigateByUrl('/admin');
          this.message = 'Login successful';
          this.valid = true;
        },
        () => {
          form.reset();
          this.message = 'An error has occurred. Please try again later.';
          this.valid = false;
        }
      );
    } else {
      this.message = 'Invalid credentials';
      this.valid = false;
    }
  }
}
