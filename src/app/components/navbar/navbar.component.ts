import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { AuthService } from './../../services/auth/auth.service';
import { CourseService } from './../../services/course/course.service';

import { Alert } from './../../common/interfaces/alert';
import { ContextResource } from './../../common/interfaces/context-resource';

import { AppError } from './../../common/errors/app-error';
import { NotFoundError } from './../../common/errors/not-found-error';
import { BadRequestError } from './../../common/errors/bad-request-error';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output('courseInfoUpdated') courseInfoUpdated = new EventEmitter<Alert>();

  isEditCourseInfoModalOpen:    boolean;
  isEditCourseInfoTextAreaOpen: boolean;
  isLoading:                    boolean;
  courseInfo:                   string;
  courseInfoEditable:           string;
  contextSelected:              any;

  constructor(
    private authService:   AuthService,
    private courseService: CourseService,
    private router:        Router,
    private route:         ActivatedRoute
  ) {}

  ngOnInit() {
    this.contextSelected = this.route.snapshot.params;
    this.courseInfo = 'No hay información para el curso.'

    this.courseService.getSingle(this.contextSelected.courseId)
      .subscribe(
        response => {
          this.courseInfo = response.json().information;
          this.courseInfoEditable = this.courseInfo;
        },
        (error: AppError) => {
          if(error instanceof NotFoundError)
            return;

          if(error instanceof BadRequestError)
            return this.router.navigate(['/context']);

          throw error;
        }
      )
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  closeEditCourseInfoModal(): void {
    this.isEditCourseInfoTextAreaOpen = false;
    this.isEditCourseInfoModalOpen = false;
    this.courseInfoEditable = this.courseInfo;
  }

  updateCourseInfo(): void {
    this.isLoading = true;

    this.courseService.update({information: this.courseInfoEditable}, this.contextSelected.courseId)
      .finally(() => this.isLoading = false)
      .subscribe(
        response => {
          this.courseInfo = response.json().information;
          this.closeEditCourseInfoModal();
          this.courseInfoUpdated.emit({
            type: 'alert-success',
            message: 'La información del curso se actualizó correctamente.'
          });
        },
        (error: AppError) => {
          throw error;
        }
      );
  }

  changeRoute(route: string): void {
    this.router.navigate(
      [
        route,
        this.contextSelected.educPlanId, 
        this.contextSelected.educPlanName, 
        this.contextSelected.courseId, 
        this.contextSelected.courseName, 
        this.contextSelected.groupId, 
        this.contextSelected.groupName
      ]
    ); 
  }
}