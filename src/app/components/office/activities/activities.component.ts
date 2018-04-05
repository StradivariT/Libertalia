import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';

import { ActivitiesHeaderComponent } from './activities-header/activities-header.component';
import { ActivitiesDescriptionComponent } from './activities-description/activities-description.component';

import { Alert } from './../../../common/interfaces/alert';
import { Student } from '../../../common/interfaces/student';
import { Activity } from './../../../common/interfaces/activity';

@Component({
  selector: 'activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent {
  @ViewChild('activitiesHeader')      activitiesHeader: ActivitiesHeaderComponent;
  @ViewChild('activitiesDescription') activitiesDescription: ActivitiesDescriptionComponent;

  @Input('studentSelected') studentSelected: Student;

  @Output('alertEmitter') alertEmitter = new EventEmitter<Alert>();

  noActivities:     boolean;
  activitySelected: Activity;

  displayAlert(alert: Alert): void { this.alertEmitter.emit(alert); }
}