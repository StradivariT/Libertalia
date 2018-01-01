import { Injectable } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/Observable';

import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

import { InvalidCredentialsError } from './../../common/errors/invalid-credentials-error';
import { AppError } from './../../common/errors/app-error';

@Injectable()
export class AuthService implements OnInit {
  authState: any = null;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private router: Router) {}

  ngOnInit(): void { 
    this.firebaseAuth.authState
      .subscribe(authentication => {
        this.authState = authentication;
      });
  }

  isAuthenticated(): boolean { return localStorage.getItem('userInfo') !== null; }

  login(email, password): Promise<any> {
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password)
      .then(userAuthInfo => {
        localStorage.setItem('userInfo', JSON.stringify(userAuthInfo));
      })
      .catch(this.handleError);
  }

  logout(): Promise<any> {
    return this.firebaseAuth.auth.signOut()
      .then(() => {
        localStorage.removeItem('userInfo');
      })
      .catch(this.handleError);
  }

  private handleError(error): Promise<AppError> {
    if(error.code === "auth/user-not-found" || error.code === "auth/wrong-password")
      return Promise.reject(new InvalidCredentialsError());

    return Promise.reject(new AppError());
  }
}