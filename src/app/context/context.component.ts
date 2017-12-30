import { Component, OnInit } from '@angular/core';

import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { ContextService } from '../services/context/context.service';

@Component({
  selector: 'context',
  templateUrl: './context.component.html',
  styleUrls: ['./context.component.css']
})
export class ContextComponent implements OnInit {
  mainContexts: any[];
  static currentContext: number;
  static contextLabel = {
    0: "-",
    1: "-",
    2: "-"
  };
  static contextSelected = {
    0: "",
    1: "",
    2: ""
  }

  constructor(
    protected service: ContextService,
    protected loadingSpinner: Ng4LoadingSpinnerService) {}

  ngOnInit() {
    this.loadingSpinner.show();

    this.service.getMainContexts()
      .subscribe(
        mainContexts => {
          this.loadingSpinner.hide();
          this.mainContexts = mainContexts;
        },
        error => {
          this.loadingSpinner.hide();
          throw error;
        });
  }

  setCurrentContext(contextIndex): void { ContextComponent.currentContext = contextIndex; }

  get currentContext() { return ContextComponent.currentContext; }
  get contextLabel() { return ContextComponent.contextLabel; }
  get contextSelected() { return ContextComponent.contextSelected; }
}