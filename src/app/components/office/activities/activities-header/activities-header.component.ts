import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

import { Alert } from './../../../../common/interfaces/alert';
import { Student } from '../../../../common/interfaces/student';
import { Activity } from './../../../../common/interfaces/activity';

import { StudentsService } from '../../../../services/students/students.service';
import { ActivitiesService } from './../../../../services/activities/activities.service';

import { AppError } from './../../../../common/errors/app-error';
import { NotFoundError } from '../../../../common/errors/not-found-error';

@Component({
  selector: 'activities-header',
  templateUrl: './activities-header.component.html',
  styleUrls: ['./activities-header.component.css']
})
export class ActivitiesHeaderComponent implements OnInit, OnChanges {
  @Input('studentSelected') studentSelected: Student;

  @Output('noActivities')     noActivities = new EventEmitter<boolean>();
  @Output('alertEmitter')     alertEmitter = new EventEmitter<Alert>();
  @Output('activitySelected') activitySelectedEmitter = new EventEmitter<Activity>();

  isLoading:               boolean;
  isLoadingModal:          boolean;
  isEditStudentModalOpen:  boolean;
  isAddActivityModalOpen:  boolean;
  studentSelectedEditable: Student;
  newActivity:             Activity;
  activitySelected:        Activity;
  activities:              Activity[];

  private activityAddedAlert:  Alert;
  private studentUpdatedAlert: Alert;

  constructor(
    private activitiesService: ActivitiesService,
    private studentsService:   StudentsService
  ) {}

  ngOnInit() {
    this.activities = [];
    this.studentSelected = this.studentSelectedEditable = {
      id:     0,
      number: 0,
      name:   ""
    };

    this.newActivity = {
      id:           0,
      name:         "",
      fileName:     "",
      turnedInDate: null
    };

    this.activityAddedAlert = {
      type:    'alert-success',
      message: 'La actividad se agregó correctamente.'
    };

    this.studentUpdatedAlert = {
      type:    'alert-success',
      message: 'La información del alumno se actualizó correctamente.'
    };
  }

  ngOnChanges(changes: any) {
    this.studentSelected = changes.studentSelected.currentValue;

    if(this.studentSelected == undefined)
      return;
  
    this.studentSelectedEditable = {
      id:     0,
      number: this.studentSelected.number,
      name:   this.studentSelected.name
    };

    this.activities = [];
    this.isLoading = true;
    this.noActivities.emit(true);

    this.activitiesService.getAll(this.studentSelected.id)
      .finally(() => this.isLoading = false)
      .subscribe(
        activities => {
          this.activities = activities as Activity[];
          this.selectActivity(this.activities[0]);
        },
        (error: AppError) => {
          if(error instanceof NotFoundError)
            return;

          throw error;
        }
      );
  }

  compareActivities(activity1: Activity, activity2: Activity): boolean {
    return activity1 && activity2 ? activity1.id == activity2.id : activity1 === activity2;
  }

  selectFile(file: File): void {
    if(file == undefined)
      return;
  
    this.newActivity.fileName = file.name;
    this.newActivity.file = file;
  }

  isNewActivityNotValid(): boolean {
    return !this.newActivity.name || !this.newActivity.turnedInDate || !this.newActivity.file;
  }

  closeAddActivityModal(): void {
    this.isAddActivityModalOpen = false;

    this.newActivity = {
      id:           0,
      name:         "",
      fileName:     "",
      turnedInDate: null,
      file:         null
    };
  }

  addActivity(): void {
    let activityFormData = new FormData();
    activityFormData.append('name',         this.newActivity.name);
    activityFormData.append('turnedInDate', this.newActivity.turnedInDate);
    activityFormData.append('file',         this.newActivity.file, this.newActivity.fileName);

    this.isLoadingModal = true;

    this.activitiesService.create(activityFormData, this.studentSelected.id)
      .finally(() => this.isLoadingModal = false)
      .subscribe(
        newActivity => {
          this.activities.push(newActivity as Activity);

          if(this.activities.length == 1)
            this.selectActivity(this.activities[0]);

          this.closeAddActivityModal();
          this.alertEmitter.emit(this.activityAddedAlert);
        }
      );
  }

  selectActivity(activity: Activity): void {
    this.noActivities.emit(false);

    this.activitySelected = activity;
    this.activitySelectedEmitter.emit(this.activitySelected);
  }

  isStudentSelectedEditableNotValid(): boolean {
    return (!this.studentSelectedEditable.number || !this.studentSelectedEditable.name) || 
      (this.studentSelectedEditable.number == this.studentSelected.number && this.studentSelectedEditable.name == this.studentSelected.name);
  }

  closeEditStudentModal(): void {
    this.isEditStudentModalOpen = false;
    this.studentSelectedEditable.name = this.studentSelected.name;
    this.studentSelectedEditable.number = this.studentSelected.number;
  }

  updateStudent(): void {
    let updatedStudent = {
      name:   this.studentSelectedEditable.name,
      number: this.studentSelectedEditable.number 
    };

    this.isLoadingModal = true;

    this.studentsService.update(updatedStudent, this.studentSelected.id)
      .finally(() => this.isLoadingModal = false)
      .subscribe(
        updatedStudent => {
          this.studentSelected.name = updatedStudent.name;
          this.studentSelected.number = updatedStudent.number;
          
          this.closeEditStudentModal();
          this.alertEmitter.emit(this.studentUpdatedAlert);
        }
      );
  }
}