import { Http, ResponseContentType } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { HttpService } from './../http/http.service';

@Injectable()
export class GroupService extends HttpService{
  constructor(http: Http) { super(http, '/group', '/course/'); }

  downloadFile(id: number, fileType: string): Observable<any> {
    return this.http.get(this.url + this.endpoint + '/' + id + '/file/' + fileType + this.token, { responseType: ResponseContentType.Blob })
      .catch(this.handleError);
  }
}
