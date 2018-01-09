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

  constructor(
    private assignmentsService: AssignmentsService,
    private loadingSpinner: Ng4LoadingSpinnerService
  ) {}

  ngOnInit() {
    this.assignmentFilter = '';
    this.loadingSpinner.show();

    this.assignmentsService.getAssignments(this.studentId)
      .subscribe(
        assignments => {
          this.loadingSpinner.hide();
          this.assignments = assignments;

          console.log(this.assignments)
        },
        this.handleError
      );
  }

  private handleError(error) {
    this.loadingSpinner.hide();
    throw error;
  }
}
