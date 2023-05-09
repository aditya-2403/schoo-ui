import { LoginService } from './login.service';
import { Component, OnInit, OnDestroy,  } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  subscription: Subscription;
  constructor(private router: Router, private spinner: NgxSpinnerService, private loginService: LoginService) { }
  ngOnInit(): void {

    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      password: new FormControl('', [Validators.required, Validators.maxLength(60)])
    });
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('reftoken');
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
  }

  public submit = (loginFormValue) => {
    if (this.loginForm.valid) {
      this.login(loginFormValue);
    }
  }

  public login = (loginFormValue) => {
    {
      this.spinner.show();
      this.subscription = this.loginService.getToken(loginFormValue.username, loginFormValue.password).subscribe(
        res => {
          this.spinner.hide();
          console.log(res);
          window.localStorage.setItem( 'token' , res.token);
          window.localStorage.setItem( 'reftoken' , res.reftoken);
          var decodeToken = this.parseJwt(res.token);
          if(decodeToken['role'] === "ROLE_Admin"){
            this.router.navigate(['/sc/dashboard/app-dashboard']);
          }
        }
        , error => {
          this.spinner.hide();
        });
    }
  }

  private parseJwt = (token) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };


}
