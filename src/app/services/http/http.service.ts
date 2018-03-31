import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, ResponseContentType } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';

import { shambhalaURL } from './../../../environments/environment';

import { AppError } from './../../common/errors/app-error';
import { NotFoundError } from './../../common/errors/not-found-error';
import { BadRequestError } from './../../common/errors/bad-request-error';
import { InvalidCredentialsError } from './../../common/errors/invalid-credentials-error';

@Injectable()
export class HttpService {
  protected url:   string;
  protected token: string;

  constructor(
    protected http:         Http,
    protected endpoint:     string,
    private parentEndpoint: string
  ) {
    this.url = shambhalaURL;
    this.token = '?token=' + localStorage.getItem('token');
  }

  getSingle(id: number): Observable<any> {
    return this.http.get(this.url + this.endpoint + '/' + id + this.token)
      .map(response => { return response.json(); })
      .catch(this.handleError);
  }

  getAll(parentId?: number): Observable<any> {
    return this.http.get(this.url + this.parentEndpoint + (parentId || '') + this.endpoint + this.token)
      .map(response => { return response.json(); })
      .catch(this.handleError);
  }

  create(data: any, parentId?: number): Observable<any> {
    return this.http.post(this.url + this.parentEndpoint + (parentId || '') + this.endpoint + this.token, data)
      .map(response => { return response.json(); })
      .catch(this.handleError);
  }

  update(data: any, id: number): Observable<any> {
    return this.http.patch(this.url + this.endpoint + '/' + id + this.token, data)
      .map(response => { return response.json(); })
      .catch(this.handleError);
  }

  download(id: number): Observable<any> {
    return this.http.get(this.url + this.endpoint + '/' + id + '/file' + this.token, { responseType: ResponseContentType.Blob })
      .map(response => { return response.blob(); })
      .catch(this.handleError);
  }

  uploadFile(data: any, id: number): Observable<any> {
    return this.http.post(this.url + this.endpoint + '/' + id + '/file' + this.token, data)
      .catch(this.handleError);
  }

  protected handleError(error: Response): Observable<any> {
    if(error.status == 400)
      return Observable.throw(new BadRequestError(error));

    if(error.status == 401)
      return Observable.throw(new InvalidCredentialsError());
  
    if(error.status == 404)
      return Observable.throw(new NotFoundError());

    return Observable.throw(new AppError(error));
  }
}