import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ContextService } from 'app/services/context/context.service';

import { Alert } from './../../common/interfaces/alert';

import { AppError } from './../../common/errors/app-error';
import { BadRequestError } from './../../common/errors/bad-request-error';

@Component({
  selector: 'context-edit',
  templateUrl: './context-edit.component.html',
  styleUrls: ['./context-edit.component.css']
})
export class ContextEditComponent implements OnInit {
  contextSelected:         any;
  contextSelectedEditable: any;
  isLoading:               boolean;
  isAlertOpen:             boolean;
  alert:                   Alert;

  private contextUpdatedAlert: Alert;
  private contextErrorAlert:   Alert;

  constructor(
    private route:          ActivatedRoute,
    private router:         Router,
    private contextService: ContextService
  ) {}

  ngOnInit() {
    this.contextSelected = this.route.snapshot.params;
    this.contextSelectedEditable = JSON.parse(JSON.stringify(this.contextSelected));

    this.contextUpdatedAlert = {
      type:    'alert-success',
      message: 'El contexto se actualizó correctamente.'
    };

    this.contextErrorAlert = {
      type: 'alert-danger',
      message: ''
    };
  }

  isEditContextFormInvalid(): boolean {
    return (!this.contextSelectedEditable.educPlanName || !this.contextSelectedEditable.courseName || !this.contextSelectedEditable.groupName) ||
      (this.contextSelectedEditable.educPlanName == this.contextSelected.educPlanName &&
       this.contextSelectedEditable.courseName == this.contextSelected.courseName &&
       this.contextSelectedEditable.groupName == this.contextSelected.groupName);
  }

  updateContext(): void {
    this.closeAlert();

    let updatedContextData = {
      educPlanId:   this.contextSelected.educPlanId,
      educPlanName: this.contextSelectedEditable.educPlanName == this.contextSelected.educPlanName ? '' : this.contextSelectedEditable.educPlanName,
      courseId:     this.contextSelected.courseId,
      courseName:   this.contextSelectedEditable.courseName == this.contextSelected.courseName ? '' : this.contextSelectedEditable.courseName,
      groupId:      this.contextSelected.groupId,
      groupName:    this.contextSelectedEditable.groupName == this.contextSelected.groupName ? '' : this.contextSelectedEditable.groupName
    };

    this.isLoading = true;
    this.contextService.update(updatedContextData, 0)
      .finally(() => this.isLoading = false)
      .subscribe(
        contextUpdated => {
          this.displayAlert(this.contextUpdatedAlert);

          this.router.navigate([
            '/contextEdit',
            this.contextSelected.educPlanId,
            contextUpdated.educPlanName || this.contextSelected.educPlanName,
            this.contextSelected.courseId,
            contextUpdated.courseName || this.contextSelected.courseName,
            this.contextSelected.groupId,
            contextUpdated.groupName || this.contextSelected.groupName 
          ]);

          setTimeout(function() {
            window.location.reload();
          }, 1000);
        },
        (error: AppError) => {
          if(error instanceof BadRequestError) {
            this.contextErrorAlert.message = error.error.json();
            return this.displayAlert(this.contextErrorAlert);
          }

          throw error;
        }
      );
  }

  closeAlert(): void { this.isAlertOpen = false; }

  displayAlert(alert: Alert): void {
    this.isAlertOpen=true;
    this.alert = alert;
  }
}