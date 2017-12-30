import { ContextComponent } from './../context.component';
import { Component, OnInit } from '@angular/core';

import { ContextService } from './../../services/context/context.service';

import { Observable } from 'rxjs/Observable';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { contexts } from '../context.component';

export interface Context {
  name: string
}

@Component({
  selector: 'context-list',
  templateUrl: './context-list.component.html',
  styleUrls: ['./context-list.component.css']
})
export class ContextListComponent extends ContextComponent implements OnInit {
  contextList: Observable<{} | Context[]>

  constructor(private service: ContextService, private loadingSpinner: Ng4LoadingSpinnerService) { super(); }

  ngOnInit() {
    this.contextList = this.service.getContext()
                        .catch(error => { throw error });
  }

  selectContext(context) {
    ContextComponent.contextSelected[contexts[ContextComponent.contextType]] = context;
  }
}