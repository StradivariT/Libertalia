import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { toast } from 'angular2-materialize';
import { toastDuration } from './../../../environments/environment';

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
  preventiveMessages:   string[];

  constructor(
    private contextService: ContextService,
    private loadingSpinner: Ng4LoadingSpinnerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subContextSelected = [];
    this.contextFilter = '';
    this.preventiveMessages = [
      'Selecciona un plan educativo primero.',
      'Selecciona un curso primero.'
    ];

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
      .then(
        () => { 
          this.loadingSpinner.hide();
          toast("Agregado exitosamente", toastDuration);
        }, this.handleError
      );

    this.contextFilter = ''; 
  }

  enterOffice() {
    this.router.navigate([
      'office/students',
      this.subContextSelected[1].name,
      this.subContextSelected[1].id,
      this.subContextSelected[2].name,
      this.subContextSelected[2].id
    ]);
  }

  private handleError(error) {
    this.loadingSpinner.hide();
    throw error;
  }
}