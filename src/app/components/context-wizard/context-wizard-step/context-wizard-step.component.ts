import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { HttpService } from './../../../services/http/http.service';
import { GroupService } from './../../../services/group/group.service';
import { CourseService } from './../../../services/course/course.service';
import { EducPlanService } from './../../../services/educ-plan/educ-plan.service';

import { Context } from './../../../common/interfaces/context';
import { ContextResource } from '../../../common/interfaces/context-resource';
import { SelectedResource } from './../../../common/interfaces/selected-resource';

import { AppError } from './../../../common/errors/app-error';
import { NotFoundError } from './../../../common/errors/not-found-error';
import { BadRequestError } from './../../../common/errors/bad-request-error';

@Component({
  selector: 'context-wizard-step',
  templateUrl: './context-wizard-step.component.html',
  styleUrls: ['./context-wizard-step.component.css']
})
export class ContextWizardStepComponent implements OnInit {
  @Input('currentStep') currentStep: number;
  @Input('context')     context:     Context;

  @Output('emptyResources')   emptyResources   = new EventEmitter<boolean>();
  @Output('selectedResource') selectedResource = new EventEmitter<object>();

  newResource:      string;
  isLoading:        boolean;
  resourceAdded:    boolean;
  resourceError:    boolean;
  resourceSelected: ContextResource;
  contextResources: ContextResource[];
  
  private resourceServices: HttpService[];
  private previousResource: ContextResource;

  constructor(
    private educPlanService: EducPlanService,
    private courseService:   CourseService,
    private groupService:    GroupService
  ) {}

  ngOnInit() {
    this.resourceSelected = null;
    this.previousResource = null;

    this.contextResources = [];
    this.resourceServices = [
      this.educPlanService,
      this.courseService,
      this.groupService
    ];

    if(this.currentStep != 0)
      return;

    this.getResources(this.educPlanService);
  }

  addResource(): void {
    let parentId = this.previousResource ? this.previousResource.id : null;

    let newResource = {
      newResource: this.newResource
    };

    this.isLoading = true;
    this.resourceAdded = false;
    this.resourceError = false;

    this.resourceServices[this.currentStep].create(newResource, parentId)
      .finally(() => this.isLoading = false)
      .subscribe(
        newResource => {
          this.contextResources.push(newResource as ContextResource);

          if(this.contextResources.length == 1)
            this.emitSelectedResource(this.contextResources[0]);
            
          this.newResource = '';
          this.resourceAdded = true;
          this.emptyResources.emit(false);
        },
        (error: AppError) => {
          if(error instanceof BadRequestError)
            return this.resourceError = true;

          throw error; 
        }
      );
  }

  nextStep(previousResource: ContextResource): void {
    if(this.currentStep == 0 || this.currentStep == undefined)
      return;

    this.previousResource = previousResource;
    this.getResources(this.resourceServices[this.currentStep], this.previousResource.id);
  }

  compareResources(resource1: ContextResource, resource2: ContextResource): boolean {
    return resource1 && resource2 ? resource1.id == resource2.id : resource1 === resource2;
  }

  emitSelectedResource(contextResource: ContextResource): void {
    let selectedResource: SelectedResource = {
      contextResource: contextResource,
      step: this.currentStep
    };

    this.resourceSelected = contextResource;
    this.selectedResource.emit(selectedResource);
  }

  private getResources(resourceService: HttpService, parentId?: number): void {
    this.isLoading = true;
    this.contextResources = [];
    this.resourceSelected = null;

    resourceService.getAll(parentId)
      .finally(() => this.isLoading = false)
      .subscribe(
        resources => {
          this.contextResources = resources as ContextResource[];
          this.emptyResources.emit(false);

          this.emitSelectedResource(this.contextResources[0]);
        },
        (error: AppError) => {
          if(error instanceof NotFoundError)
            return this.emptyResources.emit(true);

          throw error;
        }
      );
  }
}