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
  @Input('title')         title: string;
  @Input('type')          type: string;
  @Input('groupFileName') groupFileName: string;
  @Input('groupId')       groupId: number;

  @Output('groupFileAdded') groupFileAdded = new EventEmitter<Alert>();

  selectedGroupFileName: string;
  isLoading:             boolean;
  groupFile:             File;
  fileUploadedAlert:     Alert;

  constructor(private groupService: GroupService) {}

  ngOnInit() {
    this.groupFileName = '';
    this.fileUploadedAlert = {
      type:    'alert-success',
      message: 'El archivo se agregó correctamente.'
    };
  }

  ngOnChanges(changes: any) { this.groupFileName = changes.groupFileName.currentValue; }

  selectFile(file: File): void {
    if(file == undefined)
      return;
  
    this.selectedGroupFileName = file.name;
    this.groupFile = file;
  }

  uploadFile(): void {
    let groupFileFormData = new FormData();
    groupFileFormData.append('fileType',  this.type);
    groupFileFormData.append('groupFile', this.groupFile, this.selectedGroupFileName);

    this.isLoading = true;
    this.groupService.uploadFile(groupFileFormData, this.groupId)
      .finally(() => this.isLoading = false)
      .subscribe(
        groupFileName => {
          this.groupFileName = groupFileName;
          
          this.selectedGroupFileName = '';
          this.groupFile = null;

          this.groupFileAdded.emit(this.fileUploadedAlert);
        }
      );
  }

  downloadFile(): void {
    if(!this.groupFileName)
      return;

    this.groupService.downloadFile(this.groupId, this.type)
      .subscribe(
        file => downloadFileAs(file, this.groupFileName)
      );
  }
}