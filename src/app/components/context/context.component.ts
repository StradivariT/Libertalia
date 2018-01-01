import { Component, OnInit } from '@angular/core';

import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { ContextService } from './../../services/context/context.service';

import { MainContext } from './../../common/interfaces/MainContext';
import { SubContext } from './../../common/interfaces/SubContext';

import { FilterPipe } from './../../common/pipes/filter-pipe';

@Component({
  selector: 'context',
  templateUrl: './context.component.html',
  styleUrls: ['./context.component.css']
})
export class ContextComponent implements OnInit {
  mainContexts:         MainContext[];
  subContexts:          SubContext[];
  subContextSelected:   SubContext[];
  contextFilter:        string; 

  constructor(
    private contextService: ContextService,
    private loadingSpinner: Ng4LoadingSpinnerService) {}

  ngOnInit() {
    this.subContextSelected = [];
    this.contextFilter = '';

    this.loadingSpinner.show();
    this.contextService.getMainContexts()
      .subscribe(
        mainContexts => {
          this.mainContexts = mainContexts;
          this.loadingSpinner.hide();
        },
        this.handleError
      );
  }

  getSubcontexts(mainContext) {
    this.contextFilter = '';
    this.subContexts = null;

    this.loadingSpinner.show();

    this.contextService.getSubcontexts(mainContext, this.subContextSelected)
      .subscribe(
        subContexts => {
          this.subContexts = subContexts;
          this.loadingSpinner.hide();
        },
        this.handleError
      );
  }

  selectSubcontext(mainContext, subContext) {
    this.subContextSelected.splice(
      mainContext,
      this.subContextSelected.length - mainContext,
      {
        id: subContext.id,
        name: subContext.name
      }
    );
  }

  addSubcontext(mainContext) {
    this.loadingSpinner.show();

    this.contextService.addSubcontext(mainContext, this.contextFilter, this.subContextSelected)
      .then(() => this.loadingSpinner.hide(), this.handleError);

    this.contextFilter = ''; 
  }

  private handleError(error) {
    this.loadingSpinner.hide();
    throw error;
  }
}