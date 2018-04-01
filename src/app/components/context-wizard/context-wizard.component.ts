import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';

import { ClrWizard, ClrWizardPage } from '@clr/angular';

import { ContextWizardStepComponent } from './context-wizard-step/context-wizard-step.component';

import { ContextService } from 'app/services/context/context.service';

import { Context } from './../../common/interfaces/context';
import { ContextResource } from './../../common/interfaces/context-resource';
import { SelectedResource } from './../../common/interfaces/selected-resource';

@Component({
  selector: 'context-wizard',
  templateUrl: './context-wizard.component.html',
  styleUrls: ['./context-wizard.component.css']
})
export class ContextWizardComponent implements OnInit {
  @ViewChild('contextWizard')        contextWizard:      ClrWizard;
  @ViewChildren('contextWizardStep') contextWizardSteps: QueryList<ContextWizardStepComponent>;

  isWizardOpen:      boolean;
  isLoading:         boolean;
  emptyResources:    boolean;
  contexts:          Context[];
  selectedResources: ContextResource[];

  constructor(
    private contextService: ContextService,
    private router:         Router
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.isWizardOpen = true;    
    this.selectedResources = [];

    this.contextService.getAll()
      .finally(() => this.isLoading = false)
      .subscribe(contexts => this.contexts = contexts as Context[]);
  }

  appendResource(selectedResource: SelectedResource): void {
    this.selectedResources[selectedResource.step] = selectedResource.contextResource as ContextResource;
  }

  nextStep(): void {
    this.contextWizard.next();

    let currentPage = this.contextWizard.currentPage['_id'] % 3;
    this.contextWizardSteps.toArray()[currentPage].nextStep(this.selectedResources[currentPage - 1]);
  }

  loadOffice() : void {
    this.router.navigate([
      '/office',
      this.selectedResources[0].id,
      this.selectedResources[0].name,
      this.selectedResources[1].id,
      this.selectedResources[1].name,
      this.selectedResources[2].id,
      this.selectedResources[2].name
    ]);    
  }
}