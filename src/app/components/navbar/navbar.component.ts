import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { AuthService } from './../../services/auth/auth.service';
import { CourseService } from './../../services/course/course.service';

import { Alert } from './../../common/interfaces/alert';
import { ContextResource } from './../../common/interfaces/context-resource';

import { AppError } from './../../common/errors/app-error';
import { NotFoundError } from './../../common/errors/not-found-error';
import { BadRequestError } from './../../common/errors/bad-request-error';
import { GroupService } from '../../services/group/group.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output('courseInfoUpdated') courseInfoUpdated  = new EventEmitter<Alert>();
  @Output('groupIncidentsUpdated') groupIncidentsUpdated = new EventEmitter<Alert>();

  isEditCourseInfoModalOpen:    boolean;
  isEditCourseInfoTextAreaOpen: boolean;
  isGroupIncidentsModalOpen:    boolean;
  isGroupIncidentsTextAreaOpen: boolean;
  isLoading:                    boolean;
  courseInfo:                   string;
  courseInfoEditable:           string;
  groupIncidents:               string;
  groupIncidentsEditable:       string;
  contextSelected:              any;

  private updatedCourseAlert: Alert;
  private updatedGroupAlert:  Alert;

  constructor(
    private authService:   AuthService,
    private courseService: CourseService,
    private groupService:  GroupService,
    private router:        Router,
    private route:         ActivatedRoute
  ) {}

  ngOnInit() {
    this.contextSelected = this.route.snapshot.params;
    this.courseInfo = 'No hay información para el curso.';
    
    this.updatedCourseAlert = {
      type:    'alert-success',
      message: 'La información del curso se actualizó correctamente.'
    };

    this.updatedGroupAlert = {
      type:    'alert-success',
      message: 'Las incidencias del grupo se actualizaron correctamente.'
    };

    this.courseService.getSingle(this.contextSelected.courseId)
      .subscribe(
        courseInfo => {
          this.courseInfo = courseInfo;
          this.courseInfoEditable = this.courseInfo;
        },
        (error: AppError) => {
          if(error instanceof NotFoundError)
            return;

          if(error instanceof BadRequestError)
            return this.router.navigate(['/context']);

          throw error;
        }
      );

      this.groupService.getSingle(this.contextSelected.groupId)
      .subscribe(
        groupInfo => {
          this.groupIncidents = groupInfo.incidents || 'No hay incidencias del grupo.';
          this.groupIncidentsEditable = this.groupIncidents;
        },
        (error: AppError) => {
          if(error instanceof NotFoundError)
            return;

          if(error instanceof BadRequestError)
            return this.router.navigate(['/context']);

          throw error;
        }
      );
  }

  updateCourseInfo(): void {
    let updatedCourseInfo = {
      information: this.courseInfoEditable
    };

    this.isLoading = true;
    this.courseService.update(updatedCourseInfo, this.contextSelected.courseId)
      .finally(() => this.isLoading = false)
      .subscribe(
        updatedCourse => {
          this.courseInfo = updatedCourse.information;
          this.closeEditCourseInfoModal();
          this.courseInfoUpdated.emit(this.updatedCourseAlert);
        }
      );
  }

  closeEditCourseInfoModal(): void {
    this.isEditCourseInfoTextAreaOpen = false;
    this.isEditCourseInfoModalOpen = false;
    this.courseInfoEditable = this.courseInfo;
  }

  updateGroupIncidents(): void {
    let updatedGroupIncidents = {
      incidents: this.groupIncidentsEditable
    };

    this.isLoading = true;
    this.groupService.update(updatedGroupIncidents, this.contextSelected.groupId)
      .finally(() => this.isLoading = false)
      .subscribe(
        updatedGroup => {
          this.groupIncidents = updatedGroup.incidents;
          this.closeGroupIncidentsModal();
          this.groupIncidentsUpdated.emit(this.updatedGroupAlert);
        }
      );
  }

  closeGroupIncidentsModal(): void {
    this.isGroupIncidentsTextAreaOpen = false;
    this.isGroupIncidentsModalOpen = false;
    this.groupIncidentsEditable = this.groupIncidents;
  }

  navigateWithContextParams(route: string): void {
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

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}