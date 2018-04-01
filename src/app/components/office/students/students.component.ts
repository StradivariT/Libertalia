import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { StudentsService } from './../../../services/students/students.service';

import { Alert } from './../../../common/interfaces/alert';
import { Student } from './../../../common/interfaces/student';

import { AppError } from './../../../common/errors/app-error';
import { NotFoundError } from './../../../common/errors/not-found-error';
import { BadRequestError } from './../../../common/errors/bad-request-error';

@Component({
  selector: 'students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  @Output('studentAdded')    studentAdded = new EventEmitter<Alert>();
  @Output('noStudents')      noStudents = new EventEmitter<Boolean>();
  @Output('studentSelected') studentSelected = new EventEmitter<Student>();

  groupId:               number;
  studentIdSelected:     number;
  isLoading:             boolean;
  isAddStudentModalOpen: boolean;
  newStudent:            Student;
  students:              Student[];

  private studentAddedAlert: Alert;

  constructor(
    private route:           ActivatedRoute,
    private router:          Router,
    private studentsService: StudentsService
  ) {}

  ngOnInit() {
    this.groupId = this.route.snapshot.params['groupId'];
    this.students = [];
    
    this.newStudent = {
      id: 0,
      name: '',
      number: null
    };

    this.studentAddedAlert = {
      type:    'alert-success',
      message: 'El alumno fue agregado correctamente.'
    };

    this.studentsService.getAll(this.groupId)
      .subscribe(
        students => {
          this.students = students as Student[];
          this.noStudents.emit(false);
          this.selectStudent(this.students[0]);
        },
        (error: AppError) => {
          if(error instanceof NotFoundError)
            return this.noStudents.emit(true);

          if(error instanceof BadRequestError)
            return this.router.navigate(['/context']);

          throw error;
        }
      );
  }

  addStudent(): void {
    this.isLoading = true;

    this.studentsService.create(this.newStudent, this.groupId)
      .finally(() => this.isLoading = false)
      .subscribe(
        newStudent => {
          this.students.push(newStudent as Student);

          this.closeAddStudentModal();
          this.studentAdded.emit(this.studentAddedAlert);

          if(this.students.length == 1) {
            this.noStudents.emit(false);
            this.selectStudent(this.students[0]);
          }
        }
      );
  }

  closeAddStudentModal(): void {
    this.newStudent.name = '';
    this.newStudent.number = null
    this.isAddStudentModalOpen = false;
  }

  selectStudent(student: Student): void {
    this.studentIdSelected = student.id;
    this.studentSelected.emit(student);
  }
}