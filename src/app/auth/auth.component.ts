import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  valid: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.validate(form);
    this.valid
      ? localStorage.setItem('jwt', form.value.password)
      : console.error('Invalid credentials');
  }

  validate(form: NgForm): void {
    this.valid = form.value.username === 'admin' && form.value.password === 'admin';
  }

}
