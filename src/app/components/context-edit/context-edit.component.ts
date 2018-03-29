import { Alert } from './../../common/interfaces/alert';
import { BadRequestError } from './../../common/errors/bad-request-error';
import { AppError } from './../../common/errors/app-error';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ContextService } from 'app/services/context/context.service';

@Component({
  selector: 'context-edit',
  templateUrl: './context-edit.component.html',
  styleUrls: ['./context-edit.component.css']
})
export class ContextEditComponent implements OnInit {
  contextSelected:         any;
  contextSelectedEditable: any;
  isLoading:               boolean;
  hey: boolean;
  alertMessage: string;
  alertType: string;

  constructor(
    private route:          ActivatedRoute,
    private router: Router,
    private contextService: ContextService
  ) {}

  ngOnInit() {
    this.contextSelected = this.route.snapshot.params;
    this.contextSelectedEditable = JSON.parse(JSON.stringify(this.contextSelected));
  }

  isEditContextFormInvalid(): boolean {
    return (!this.contextSelectedEditable.educPlanName || !this.contextSelectedEditable.courseName || !this.contextSelectedEditable.groupName) ||
      (this.contextSelectedEditable.educPlanName == this.contextSelected.educPlanName &&
       this.contextSelectedEditable.courseName == this.contextSelected.courseName &&
       this.contextSelectedEditable.groupName == this.contextSelected.groupName);
  }

  updateContext(): void {
    let data = {
      educPlanName: this.contextSelectedEditable.educPlanName == this.contextSelected.educPlanName ? '' : this.contextSelectedEditable.educPlanName,
      educPlanId: this.contextSelected.educPlanId,
      courseName: this.contextSelectedEditable.courseName == this.contextSelected.courseName ? '' : this.contextSelectedEditable.courseName,
      courseId: this.contextSelected.courseId,
      groupName: this.contextSelectedEditable.groupName == this.contextSelected.groupName ? '' : this.contextSelectedEditable.groupName,
      groupId: this.contextSelected.groupId
    };

    this.closeAlert();
    this.isLoading = true;
    this.contextService.update(data, 0)
      .finally(() => this.isLoading = false)
      .subscribe(
        response => {
          this.displayAlert({ type: 'alert-success', message: 'El contexto se actualizó correctamente.' });
          response = response.json();

          this.router.navigate([
            '/contextEdit',
            this.contextSelected.educPlanId,
            response.educPlanName || this.contextSelected.educPlanName,
            this.contextSelected.courseId,
            response.courseName || this.contextSelected.courseName,
            this.contextSelected.groupId,
            response.groupName || this.contextSelected.groupName 
          ]);
          window.location.reload();
        },
        (error: AppError) => {
          console.log(error);

          if(error instanceof BadRequestError)
            return this.displayAlert({ type: 'alert-danger', message: error.error.json().error });

          throw error;
        }
      );
  }

  closeAlert(): void {
    this.hey = false;
  }

  private displayAlert(alert: Alert): void {
    this.hey=true;
    this.alertMessage = alert.message;
    this.alertType = alert.type;
  }
}