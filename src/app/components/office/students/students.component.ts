import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { toast } from 'angular2-materialize';
import { toastDuration } from './../../../../environments/environment';

import { FilterPipe } from './../../../common/pipes/filter-pipe';

import { StudentsService } from './../../../services/students/students.service';

import { Student } from './../../../common/interfaces/Student';
import { CurrentContext } from './../../../common/interfaces/CurrentContext';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  students: Student[];
  group: string;
  studentFilter: string;

  constructor(
    private studentsService: StudentsService,
    private route: ActivatedRoute,
    private loadingSpinner: Ng4LoadingSpinnerService
  ) {}

  ngOnInit() {
    this.group = this.route.snapshot.paramMap.get('groupId');
    this.studentFilter = '';

    this.loadingSpinner.show();
    this.studentsService.getStudents(this.group)
      .subscribe(
        students => {
          this.students = students;
          this.loadingSpinner.hide();
        },
        this.handleError 
      );
  }

  addStudent() {
    this.loadingSpinner.show();
    
    this.studentsService.addStudent(this.studentFilter)
      .then(
        () => {
          this.loadingSpinner.hide();
          toast('Alumno agregado exitosamente.', toastDuration);
        }, this.handleError
      );
  
    this.studentFilter = '';
  }

  private handleError(error) {
    this.loadingSpinner.hide();
    throw error;
  }
}