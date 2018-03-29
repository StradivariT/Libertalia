import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { HttpService } from './../http/http.service';

@Injectable()
export class ActivitiesService extends HttpService {
  constructor(http: Http) { super(http, '/activity', '/student/'); }
}