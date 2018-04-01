import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

import 'rxjs/add/operator/finally';

import { AuthService } from './../../services/auth/auth.service';

import { Credentials } from './../../common/interfaces/credentials';

import { AppError } from './../../common/errors/app-error';
import { InvalidCredentialsError } from './../../common/errors/invalid-credentials-error';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoading:          boolean;
  invalidCredentials: boolean;

  constructor(
    private authService: AuthService,
    private router:      Router
  ) {}

  login(loginForm: NgForm): void {
    const credentials: Credentials = {
      email:    loginForm.value.email,
      password: loginForm.value.password
    };

    this.closeAlert();
    this.isLoading = true;

    this.authService.login(credentials)
      .finally(() => this.isLoading = false)
      .subscribe(
        () => this.router.navigate(['/context']),
        (error: AppError) => {
          if(error instanceof InvalidCredentialsError) 
            return this.invalidCredentials = true;

          throw error;
        }
      );
  }

  closeAlert(): void { this.invalidCredentials = false; }
}