import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GroupService } from './../../services/group/group.service';

import { Alert } from './../../common/interfaces/alert';
import { GroupFileNames } from './../../common/interfaces/group-file-names';

import { AppError } from './../../common/errors/app-error';
import { BadRequestError } from './../../common/errors/bad-request-error';

@Component({
  selector: 'app-group-files',
  templateUrl: './group-files.component.html',
  styleUrls: ['./group-files.component.css']
})
export class GroupFilesComponent implements OnInit {
  groupId:        number;
  isAlertOpen:    boolean;
  isLoading:      boolean;
  alert:          Alert;
  groupFileNames: GroupFileNames;

  constructor(
    private groupService: GroupService,
    private router:       Router,
    private route:        ActivatedRoute
  ) {}

  ngOnInit() {
    this.groupId = this.route.snapshot.params.groupId;
    this.groupFileNames = {
      participantsFileName: '',
      incidentsFileName:    '',
      evaluationsFileName:  ''
    };

    this.isLoading = true;
    this.groupService.getSingle(this.groupId)
      .finally(() => this.isLoading = false)
      .subscribe(
        groupFileNames => this.groupFileNames = groupFileNames as GroupFileNames,
        (error: AppError) => {
          if(error instanceof BadRequestError)
            return this.router.navigate(['/context']);

          throw error;
        }
      );
  }

  displayAlert(alert: Alert): void {
    this.isAlertOpen = true;
    this.alert = alert;
  }

  closeAlert(): void { this.isAlertOpen = false; }
}