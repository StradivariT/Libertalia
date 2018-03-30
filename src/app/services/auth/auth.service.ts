import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { tokenNotExpired } from 'angular2-jwt';

import { HttpService } from './../http/http.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Credentials } from './../../common/interfaces/credentials';

@Injectable()
export class AuthService extends HttpService {
  constructor(http: Http) { super(http, '/login', ''); }

  login(credentials: Credentials): Observable<Response> {
    return this.http.post(this.url + this.endpoint, credentials)
      .map((response: Response) => {
        const token = response.json().token;
        localStorage.setItem('token', token);

        return null;
      })
      .catch(this.handleError);
  }

  logout(): void { localStorage.removeItem('token'); }

  isAuthenticated(): boolean { return tokenNotExpired(); }
}