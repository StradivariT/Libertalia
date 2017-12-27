import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';

import { InvalidCredentialsError } from './../common/errors/invalid-credentials-error';
import { AppError } from './../common/errors/app-error';

@Injectable()
export class AuthService implements OnInit {
  authState: any = null;

  constructor(private firebaseAuth: AngularFireAuth, private router: Router) { }

  ngOnInit() { 
    this.firebaseAuth.authState
      .subscribe(authentication => {
        this.authState = authentication;
      });
  }

  authenticatedRouting() {
    let inAuthRoutes: boolean = this.router.url !== "/";

    if(localStorage.getItem('userInfo') !== null) {
      if(inAuthRoutes)
        return;

      this.router.navigate(['/cursos']);
    } else {
      if(!inAuthRoutes)
        return;

      this.router.navigate(['/'])
    }
  }

  login(email, password) {
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password)
      .then(response => {
        localStorage.setItem('userInfo', JSON.stringify(response));
      })
      .catch(this.handleError);
  }

  logout() {
    return this.firebaseAuth.auth.signOut()
      .then(response => {
        localStorage.removeItem('userInfo');
      })
      .catch(this.handleError);
  }

  private handleError(error) {
    if(error.code === "auth/user-not-found" || error.code === "auth/wrong-password")
      return Promise.reject(new InvalidCredentialsError());

    return Promise.reject(new AppError());
  }
}
