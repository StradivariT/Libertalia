import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';

import { ActivitiesComponent } from './activities/activities.component';

import { Alert } from './../../common/interfaces/alert';
import { Student } from '../../common/interfaces/student';

@Component({
  selector: 'office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.css']
})
export class OfficeComponent implements OnInit {
  @ViewChild('activities') activities: ActivitiesComponent;

  alertMessage:    string;
  alertType:       string;
  isAlertOpen:     boolean;
  noStudents:      boolean;
  isLoading:       boolean;
  studentSelected: Student;

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {
    this.isLoading = true;
    this.noStudents = true;
  }

  displayAlert(alertInfo: Alert): void {
    this.isAlertOpen = true;
    this.alertMessage = alertInfo.message;
    this.alertType = alertInfo.type;
  }

  displayNoStudents(noStudents: boolean) {
    this.isLoading = false;
    this.noStudents = noStudents;
    this.changeDetector.detectChanges();
  }

  closeAlert(): void { this.isAlertOpen = false; }
}