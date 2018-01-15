import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { toast } from 'angular2-materialize';
import { toastDuration } from './../../../environments/environment';

import { CurrentContext } from './../../common/interfaces/CurrentContext';

import { ContextService } from '../../services/context/context.service';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.css']
})
export class OfficeComponent implements OnInit {
  currentContext: CurrentContext;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contextService: ContextService,
    private loadingSpinner: Ng4LoadingSpinnerService
  ) {}

  ngOnInit() {
    this.route.paramMap
      .subscribe(params => {
        this.currentContext = {
          courseId: params.get('courseId'),
          courseName: params.get('courseName'),
          groupId: params.get('groupId'),
          groupName: params.get('groupName') 
        };
      });
  }

  editContext() {
    this.loadingSpinner.show();

    this.contextService.updateContext(this.currentContext)
    .then(() => {
      this.loadingSpinner.hide();
      toast('La información del curso y grupo ha sido actualizada.', toastDuration);

      this.router.navigate([
        'office/students',
        this.currentContext.courseName, 
        this.currentContext.courseId,
        this.currentContext.groupName,
        this.currentContext.groupId
      ]);
    }, this.handleError);
  }

  private handleError(error) {
    this.loadingSpinner.hide();
    throw error;
  }
}