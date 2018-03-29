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

  constructor(
    private activitiesService: ActivitiesService,
    private studentsService:   StudentsService
  ) {}

  ngOnInit() {
    this.activities = [];
    this.studentSelected = this.studentSelectedEditable = {
      id: 0,
      number: 0,
      name: ""
    };

    this.newActivity = {
      id: 0,
      name: "",
      fileName: "",
      turnedInDate: null
    };
  }

  ngOnChanges(changes: any) {
    this.studentSelected = changes.studentSelected.currentValue;

    if(this.studentSelected == undefined)
      return;
  
    this.studentSelectedEditable = {
      id: this.studentSelected.id,
      number: this.studentSelected.number,
      name: this.studentSelected.name
    };

    this.activities = [];
    this.isLoading = true;
    this.noActivities.emit(true);

    this.activitiesService.getAll(this.studentSelected.id)
      .finally(() => this.isLoading = false)
      .subscribe(
        response => {
          this.activities = response.json().activities as Activity[];
          this.activitySelected = this.activities[0];
          this.emitActivitySelected();
          this.noActivities.emit(false);
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

  isStudentSelectedEditableNotValid(): boolean {
    return (!this.studentSelectedEditable.number || !this.studentSelectedEditable.name) || 
      (this.studentSelectedEditable.number == this.studentSelected.number && this.studentSelectedEditable.name == this.studentSelected.name);
  }

  updateStudentInfo(): void {
    this.isLoadingModal = true;

    this.studentsService.update({name: this.studentSelectedEditable.name, number: this.studentSelectedEditable.number}, this.studentSelected.id)
      .finally(() => this.isLoadingModal = false)
      .subscribe(
        response => {
          this.studentSelected.name = response.json().name;
          this.studentSelected.number = response.json().number;
          this.closeEditStudentModal();
          this.alertEmitter.emit({
            type: 'alert-success',
            message: 'La información del alumno se actualizó correctamente.'
          });
        },
        (error: AppError) => {
          throw error;
        }
      );
  }

  closeEditStudentModal(): void {
    this.isEditStudentModalOpen = false;
    this.studentSelectedEditable.name = this.studentSelected.name;
    this.studentSelectedEditable.number = this.studentSelected.number;
  }

  selectFile(file: File): void {
    if(file == undefined)
      return;
  
    this.newActivity.fileName = file.name;
    this.newActivity.file = file;
  }

  addActivity(): void {
    let activityFormData = new FormData();
    activityFormData.append('newActivityName', this.newActivity.name);
    activityFormData.append('turnedInDate', this.newActivity.turnedInDate);
    activityFormData.append('newActivityFile', this.newActivity.file, this.newActivity.fileName);

    this.isLoadingModal = true;

    this.activitiesService.create(activityFormData, this.studentSelected.id)
      .finally(() => this.isLoadingModal = false)
      .subscribe(
        response => {
          this.activities.push(response.json().newActivity as Activity);

          if(this.activities.length == 1) {
            this.activitySelected = this.activities[0];
            this.noActivities.emit(false);
            this.emitActivitySelected();
          }

          this.closeAddActivityModal();
          this.alertEmitter.emit({
            type: 'alert-success',
            message: 'La actividad se agregó correctamente.'
          });
        },
        (error: AppError) =>{ throw error; }
      );
  }

  isNewActivityNotValid(): boolean {
    return !this.newActivity.name || !this.newActivity.turnedInDate || !this.newActivity.file;
  }

  closeAddActivityModal(): void {
    this.isAddActivityModalOpen = false;

    this.newActivity = {
      id: 0,
      name: "",
      fileName: "",
      turnedInDate: null,
      file: null
    };
  }

  emitActivitySelected(): void {
    this.activitySelectedEmitter.emit(this.activitySelected);
  }
}