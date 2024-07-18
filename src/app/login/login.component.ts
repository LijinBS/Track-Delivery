import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from '../shared/service/cookieService/cookie.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public invalidCredentials: boolean;
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
    this.invalidCredentials = false;
  }

  ngOnInit(): void {}

  onSubmit() {
    this.invalidCredentials = false;
    console.log('submit');
    console.log(this.loginForm.value);
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      const role = this.loginService.checkLoginCredentials(
        this.loginForm.value
      );
      if (role) {
        const { username: name } = this.loginForm.value;
        this.cookieService.WriteCookie('user', { name, role });
        //  this.WriteCookie(currentRole)
        this.router.navigate(['/home']);
      } else {
        this.invalidCredentials = true;
      }
    }
  }

  //   WriteCookie(role) {
  //     let now = new Date();
  //     const minutes = 30;
  //     now.setTime(now.getTime() + (minutes * 60 * 1000));
  //     const cookieValue = JSON.stringify({name : this.loginForm.value.username, role}) + ";"
  //     document.cookie = 'user='+ cookieValue + ';expires='+now.toUTCString()+';path=/'
  //  }

  get selectFormControl() {
    return this.loginForm.controls;
  }
}
