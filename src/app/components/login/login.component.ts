import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { AuthService } from './../../services/auth/auth.service';

import { AppError } from './../../common/errors/app-error';
import { InvalidCredentialsError } from './../../common/errors/invalid-credentials-error';

import 'rxjs/add/operator/finally';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoggingIn:        boolean;
  failedLoginMessage: string;

  constructor(
    private authService:  AuthService,
    private router:       Router
  ) {}

  login(loginForm: NgForm): void {
    this.isLoggingIn = true;
    this.failedLoginMessage = null;

    this.authService.login(loginForm.value.email, loginForm.value.password)
      .finally(() => this.isLoggingIn = false)
      .subscribe(
        () => this.router.navigate(['/context']),
        error => {
          if(error instanceof InvalidCredentialsError) 
            this.failedLoginMessage = 'La información ingresada es incorrecta.';
          else
            throw error;
        }
      );
  }
}