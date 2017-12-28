import { AuthService } from './../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { toast } from 'angular2-materialize';
import { toastDuration } from './../../environments/environment';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { AppError } from './../common/errors/app-error';
import { InvalidCredentialsError } from './../common/errors/invalid-credentials-error';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router, private loadingSpinner: Ng4LoadingSpinnerService) {}

  ngOnInit() {
    this.authService.authenticatedRouting();
  }

  login(email, password) {
    this.loadingSpinner.show();
    this.authService.login(email.value, password.value)
      .then(
        response => {
          this.router.navigate(['/selection']);
        },
        (error: AppError) => {
          if(error instanceof InvalidCredentialsError)
            return toast('Algo en la información que ingresaste está mal', toastDuration)
        
          throw error;
        })
        .then(() => this.loadingSpinner.hide(), () => this.loadingSpinner.hide());
  }
}
