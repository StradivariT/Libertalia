import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GroupService } from './../../services/group/group.service';

import { Alert } from './../../common/interfaces/alert';

import { AppError } from './../../common/errors/app-error';
import { BadRequestError } from './../../common/errors/bad-request-error';

@Component({
  selector: 'app-group-files',
  templateUrl: './group-files.component.html',
  styleUrls: ['./group-files.component.css']
})
export class GroupFilesComponent implements OnInit {
  groupId:    number;
  groupFileNames: any;
  isLoading: boolean;
  alertMessage:    string;
  alertType:       string;
  isAlertOpen:     boolean

  constructor(
    private groupService: GroupService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.groupId = this.route.snapshot.params.groupId;
    this.groupFileNames = {};

    this.isLoading = true;
    this.groupService.getSingle(this.groupId)
      .finally(() => this.isLoading = false)
      .subscribe(
        response => {
          this.groupFileNames = response.json().groupFileNames;
        },
        (error: AppError) => {
          if(error instanceof BadRequestError)
            return this.router.navigate(['/context']);

          throw error;
        }
      );
  }

  displayAlert(alertInfo: Alert): void {
    this.isAlertOpen = true;
    this.alertMessage = alertInfo.message;
    this.alertType = alertInfo.type;
  }

  closeAlert(): void { this.isAlertOpen = false; }
}