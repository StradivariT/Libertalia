import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';

import { saveAs as downloadFileAs } from 'file-saver';

import { GroupService } from './../../../services/group/group.service';

import { Alert } from './../../../common/interfaces/alert';

import { AppError } from './../../../common/errors/app-error';

@Component({
  selector: 'group-files-card',
  templateUrl: './group-files-card.component.html',
  styleUrls: ['./group-files-card.component.css']
})
export class GroupFilesCardComponent implements OnInit, OnChanges {
  @Input('title') title: string;
  @Input('type')  type:  string;
  @Input('groupId') groupId: number;
  @Input('groupFileName') groupFileName: string;

  @Output('groupFileAdded') groupFileAdded = new EventEmitter<Alert>();

  groupFile:     File;
  selectedGroupFileName: string;
  isLoading:     boolean;

  constructor(private groupService: GroupService) {}

  ngOnInit() {
    this.groupFileName = '';
  }

  ngOnChanges(changes: any) {
    this.groupFileName = changes.groupFileName.currentValue;

    if(this.groupFileName == undefined)
      return;
  }

  selectFile(file: File): void {
    if(file == undefined)
      return;
  
    this.selectedGroupFileName = file.name;
    this.groupFile = file;
  }

  uploadFile(): void {
    let groupFileFormData = new FormData();
    groupFileFormData.append('fileType', this.type);
    groupFileFormData.append('groupFile', this.groupFile, this.selectedGroupFileName);

    this.isLoading = true;    
    this.groupService.uploadFile(groupFileFormData, this.groupId)
      .finally(() => this.isLoading = false)
      .subscribe(
      response => {
        this.groupFileName = response.json().groupFileName;
        this.selectedGroupFileName = '';
        this.groupFile = null;
        this.groupFileAdded.emit({
          type: 'alert-success',
          message: 'El archivo se agregó correctamente.'
        });
      }, 
      (error: AppError) => {
        throw error;
      }
    );
  }

  downloadFile(): void {
    if(!this.groupFileName)
      return;

    this.groupService.downloadFile(this.groupId, this.type)
      .subscribe(response => downloadFileAs(response.blob(), this.groupFileName));
  }
}