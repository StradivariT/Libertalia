import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { saveAs as downloadFileAs } from 'file-saver';

import { Alert } from './../../../../common/interfaces/alert';
import { Activity } from './../../../../common/interfaces/activity';

import { AppError } from './../../../../common/errors/app-error';

import { ActivitiesService } from '../../../../services/activities/activities.service';

@Component({
  selector: 'activities-description',
  templateUrl: './activities-description.component.html',
  styleUrls: ['./activities-description.component.css']
})
export class ActivitiesDescriptionComponent implements OnInit, OnChanges {
  @Input('activitySelected') activitySelected: Activity;
  @Output('activityUpdated') activityUpdated = new EventEmitter<Alert>();
  
  isEditingActivity:  boolean;
  isLoadingActivity:  boolean;
  isUpdatingActivity: boolean;
  activity:           Activity;
  activityEditable:   Activity;

  constructor(private activitiesService: ActivitiesService) {}

  ngOnInit() {
    this.activity = this.activityEditable = {
      id: 0,
      name: ""
    };
  }

  ngOnChanges(changes: any) {
    this.activitySelected = changes.activitySelected.currentValue;

    if(this.activitySelected == undefined)
      return;

    this.isLoadingActivity = true;
    this.activitiesService.getSingle(this.activitySelected.id)
      .finally(() => this.isLoadingActivity = false)
      .subscribe(
        response => {
          this.activity = response.json().activity as Activity;
          this.handleActivityNulls();
          this.closeActivityEditable();
        },
        (error: AppError) => {
          throw error;
        }
      );
  }

  closeActivityEditable(): void {
    this.isEditingActivity = false;
    this.activityEditable = {
      id: 0,
      name: this.activity.name,
      grade: this.activity.grade,
      turnedInDate: this.activity.turnedInDate,
      feedback: this.activity.feedback,
      incidents: this.activity.incidents
    };
  }

  isActivityEditableNotValid(): boolean {
    return (!this.activityEditable.name || !this.activityEditable.turnedInDate) ||
      (this.activityEditable.name == this.activity.name && this.activityEditable.turnedInDate == this.activity.turnedInDate &&
      this.activityEditable.grade == this.activity.grade && this.activityEditable.feedback == this.activity.feedback && this.activityEditable.incidents == this.activity.incidents);
  }

  updateActivity(): void {
    this.isUpdatingActivity = true;

    this.activitiesService.update(this.activityEditable, this.activity.id)
      .finally(() => this.isUpdatingActivity = false)
      .subscribe(
        response => {
          this.activity = response.json().activity as Activity;
          this.activitySelected.name = this.activity.name;

          this.handleActivityNulls();
          this.closeActivityEditable();
          
          this.activityUpdated.emit({
            type: 'alert-success',
            message: 'La actividad se actualizó correctamente.'
          });
        },
        (error: AppError) => {
          throw error;
        }
      );
  }

  downloadFile(): void {
    this.activitiesService.download(this.activity.id)
      .subscribe(response => downloadFileAs(response.blob(), this.activity.fileName));
  }

  private handleActivityNulls(): void {
    this.activity.grade = (this.activity.grade || '');
    this.activity.feedback = (this.activity.feedback || '');
    this.activity.incidents = (this.activity.incidents || '');
  }
}