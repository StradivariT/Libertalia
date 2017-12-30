import { Component, OnInit } from '@angular/core';

import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { ContextComponent } from './../context.component';
import { ContextService } from './../../services/context/context.service';

const mainContexts = {
  educPlan: 0,
  courses: 1,
  groups: 2
};

@Component({
  selector: 'context-list',
  templateUrl: './context-list.component.html',
  styleUrls: ['./context-list.component.css']
})
export class ContextListComponent extends ContextComponent implements OnInit {
  contextList: any[];

  constructor(
    service: ContextService,
    loadingSpinner: Ng4LoadingSpinnerService) { super(service, loadingSpinner); }

  ngOnInit() {
    // this.loadingSpinner.show();

    if(ContextComponent.currentContext == mainContexts.educPlan)
      return this.getEducPlans()
  }

  getEducPlans(): void {
    this.service.getEducPlans()
      .subscribe(
        educPlans => {
          this.loadingSpinner.hide();

          this.contextList = educPlans;
        },
        error => {
          this.loadingSpinner.hide();

          throw error;
        });
  }

  selectContext(contextId, contextName): void {
    ContextComponent.contextLabel[ContextComponent.currentContext] = contextName;
    ContextComponent.contextSelected[ContextComponent.currentContext] = contextId;
  }
}