import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { tokenNotExpired } from 'angular2-jwt';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { AppError } from './../../common/errors/app-error';
import { InvalidCredentialsError } from './../../common/errors/invalid-credentials-error';

@Injectable()
export class AuthService {
  private url = 'http://localhost:8000/api/';

  constructor(private http: Http) {}

  login(email: string, password: string): Observable<Response> {
    return this.http.post(this.url + 'login', {email: email, password: password})
      .map((response: Response) => {
        const token = response.json().token;

        localStorage.setItem('token', token);
        return null;
      })
      .catch(this.handleError);
  }

  logout(): void { localStorage.removeItem('token'); }

  isAuthenticated(): boolean { return tokenNotExpired(); }

  private handleError(error: Response): Observable<Response> {
    if(error.status == 401)
      return Observable.throw(new InvalidCredentialsError());

    return Observable.throw(new AppError(error));
  }
}