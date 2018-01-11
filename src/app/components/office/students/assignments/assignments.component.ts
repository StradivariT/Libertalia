import { Component, Input, OnInit } from '@angular/core';

import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { toast } from 'angular2-materialize';
import { toastDuration } from './../../../../../environments/environment';

import { FilterPipe } from './../../../../common/pipes/filter-pipe';

import { Assignment } from './../../../../common/interfaces/Assignment';

import { AssignmentsService } from '../../../../services/assignments/assignments.service';


@Component({
  selector: 'assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  @Input() studentId: string;

  newAssignment: Assignment;
  assignments: Assignment[];
  assignmentFilter: string;
  newAssignmentFile: File;

  constructor(
    private assignmentsService: AssignmentsService,
    private loadingSpinner: Ng4LoadingSpinnerService
  ) {}

  ngOnInit() {
    this.assignmentFilter = '';
    this.newAssignment = {
      name: '',
      date: null
    };

    this.loadingSpinner.show();
    this.assignmentsService.getAssignments(this.studentId)
      .subscribe(
        assignments => {
          this.loadingSpinner.hide();
          this.assignments = assignments;
        },
        this.handleError
      );
  }

  setAssignmentFile(fileEvent) {
    this.newAssignmentFile = fileEvent.srcElement.files[0];
  }

  addAssignment() {
    this.loadingSpinner.show();
    
    this.newAssignment.name = this.assignmentFilter;
    this.assignmentsService.addAssignment(this.studentId, this.newAssignment, this.newAssignmentFile)
      .then(() => {
        this.assignmentFilter = '';
        this.newAssignment = {
          name: '',
          date: null
        };

        toast('La actividad se subió correctamente', toastDuration);
        this.loadingSpinner.hide();
      },
      this.handleError
    );
  }

  private handleError(error) {
    // this.loadingSpinner.hide();

    throw error;
  }
}
