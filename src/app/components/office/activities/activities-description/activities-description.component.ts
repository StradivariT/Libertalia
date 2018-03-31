import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

import { saveAs as downloadFileAs } from 'file-saver';

import { ActivitiesService } from '../../../../services/activities/activities.service';

import { Alert } from './../../../../common/interfaces/alert';
import { Activity } from './../../../../common/interfaces/activity';

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

  private activityUpdatedAlert: Alert;

  constructor(private activitiesService: ActivitiesService) {}

  ngOnInit() {
    this.activity = this.activityEditable = {
      id:   0,
      name: ""
    };

    this.activityUpdatedAlert = {
      type:    'alert-success',
      message: 'La actividad se actualizó correctamente.'
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
        activity => {
          this.activity = activity as Activity;
          this.handleActivityNulls();
        }
      );
  }

  isActivityEditableNotValid(): boolean {
    return (!this.activityEditable.name || !this.activityEditable.turnedInDate) ||
      (this.activityEditable.name == this.activity.name && this.activityEditable.turnedInDate == this.activity.turnedInDate &&
      this.activityEditable.grade == this.activity.grade && this.activityEditable.feedback == this.activity.feedback &&
      this.activityEditable.incidents == this.activity.incidents);
  }

  closeActivityEditable(): void {
    this.isEditingActivity = false;
    this.activityEditable = {
      id:           0,
      name:         this.activity.name,
      grade:        this.activity.grade,
      turnedInDate: this.activity.turnedInDate,
      feedback:     this.activity.feedback,
      incidents:    this.activity.incidents
    };
  }

  updateActivity(): void {
    this.isUpdatingActivity = true;

    this.activitiesService.update(this.activityEditable, this.activity.id)
      .finally(() => this.isUpdatingActivity = false)
      .subscribe(
        activity => {
          this.activity = activity as Activity;
          this.activitySelected.name = this.activity.name;

          this.handleActivityNulls();
          this.activityUpdated.emit(this.activityUpdatedAlert);
        }
      );
  }

  downloadFile(): void {
    this.activitiesService.download(this.activity.id)
      .subscribe(
        file => downloadFileAs(file, this.activity.fileName)
      );
  }

  private handleActivityNulls(): void {
    this.activity.grade = (this.activity.grade || '');
    this.activity.feedback = (this.activity.feedback || '');
    this.activity.incidents = (this.activity.incidents || '');

    this.closeActivityEditable();
  }
}