import { Component, Input, OnInit } from '@angular/core';

import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { FilterPipe } from './../../../../common/pipes/filter-pipe';

import { AssignmentsService } from '../../../../services/assignments/assignments.service';

import { Assignment } from './../../../../common/interfaces/Assignment';

@Component({
  selector: 'assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  @Input() studentId: string;
  assignments: Assignment[];
  assignmentFilter: string;
  newAssignment: Assignment;
  newAssignmentFile: File;

  constructor(
    private assignmentsService: AssignmentsService,
    private loadingSpinner: Ng4LoadingSpinnerService
  ) {}

  ngOnInit() {
    this.assignmentFilter = '';
    this.loadingSpinner.show();

    this.newAssignment = {
      name: '',
      date: null
    }

    this.assignmentsService.getAssignments(this.studentId)
      .subscribe(
        assignments => {
          this.loadingSpinner.hide();
          this.assignments = assignments;
        },
        this.handleError
      );
  }

  setFile(event) {
    this.newAssignmentFile = event.srcElement.files[0];
  }

  addAssignment() {
    this.newAssignment.name = this.assignmentFilter;
    
    this.assignmentsService.addAssignment(this.newAssignment, this.newAssignmentFile);
  }

  private handleError(error) {
    this.loadingSpinner.hide();
    throw error;
  }
}
