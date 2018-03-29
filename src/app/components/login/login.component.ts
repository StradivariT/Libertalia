import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

import 'rxjs/add/operator/finally';

import { AuthService } from './../../services/auth/auth.service';

import { AppError } from './../../common/errors/app-error';
import { InvalidCredentialsError } from './../../common/errors/invalid-credentials-error';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoading:   boolean;
  loginFailed: boolean;

  constructor(
    private authService: AuthService,
    private router:      Router
  ) {}

  login(loginForm: NgForm): void {
    this.closeAlert();
    this.isLoading = true;

    this.authService.login(loginForm.value.email, loginForm.value.password)
      .finally(() => this.isLoading = false)
      .subscribe(
        () => this.router.navigate(['/context']),
        (error: AppError) => {
          if(error instanceof InvalidCredentialsError) 
            return this.loginFailed = true;

          throw error;
        }
      );
  }

  closeAlert(): void { this.loginFailed = false; }
}