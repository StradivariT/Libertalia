import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';

import { ActivitiesHeaderComponent } from './activities-header/activities-header.component';
import { ActivitiesDescriptionComponent } from './activities-description/activities-description.component';

import { Alert } from './../../../common/interfaces/alert';
import { Student } from '../../../common/interfaces/student';

@Component({
  selector: 'activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {
  @Input('studentSelected') studentSelected: Student;

  @Output('alertEmitter') alertEmitter = new EventEmitter<Alert>();

  @ViewChild('activitiesHeader') activitiesHeader: ActivitiesHeaderComponent;
  @ViewChild('activitiesDescription') activitiesDescription: ActivitiesDescriptionComponent;

  noActivities: boolean;

  constructor() { }

  ngOnInit() {
  }

  displayAlert(alert: Alert) { this.alertEmitter.emit(alert); }
}