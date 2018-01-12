import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Assignment } from './../../common/interfaces/Assignment';

import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase';

import { toast } from 'angular2-materialize';
import { toastDuration } from '../../../environments/environment';

import { AppError } from '../../common/errors/app-error';

@Injectable()
export class AssignmentsService {
  private studentDoc: AngularFirestoreDocument<any>;
  private assignmentsCollection: AngularFirestoreCollection<Assignment>;
  private assignmentsStorage: any;
  private firebaseApp: FirebaseApp;
  private fileExtensionReg: RegExp;

  constructor(
    private firestore: AngularFirestore,
    firebaseApp: FirebaseApp
  ) { this.firebaseApp = firebaseApp; this.fileExtensionReg = /(?:\.([^.]+))?$/; this.assignmentsStorage = this.firebaseApp.storage().ref(); }

  getAssignments(studentId): Observable<any> {
    this.studentDoc = this.firestore.doc('students/' + studentId);
    this.assignmentsCollection = this.firestore.collection('assignments', ref => ref.where('studentDoc', '==', this.studentDoc.ref));

    return this.assignmentsCollection
      .snapshotChanges()
      .map(this.handleSnapshots)
      .catch(this.handleObservableError);
  }

  addAssignment(studentId, assignment, assignmentFile): Promise<any> {
    this.studentDoc = this.firestore.doc('students/' + studentId);
    this.assignmentsCollection = this.firestore.collection('assignments', ref => ref.where('studentDoc', '==', this.studentDoc.ref));

    let fileId = this.guidGenerator() + '.' + this.fileExtensionReg.exec(assignmentFile.name)[1];

    let uploadTask = this.assignmentsStorage
      .child('/assignmentsFiles/' + this.studentDoc.ref.id + '/' + fileId)
      .put(assignmentFile);

    toast('La actividad se está subiendo, espera un momento...', toastDuration);
    uploadTask.on('state_changed',
      (snapshot) => {
        let progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
        toast('Progreso: ' + Math.ceil(progress) + '%', 1000);
      }
    );

    return uploadTask
      .then(
        (snapshot) => {
          assignment.file = {
            fileName:  assignmentFile.name,
            fileURL:   snapshot.downloadURL
          }

          assignment.studentDoc = this.studentDoc.ref;
          assignment.file.id = fileId;

          return this.assignmentsCollection.add(assignment)
            .then(null, this.handlePromiseError);
        },
        this.handlePromiseError
      );
  }

  updateAssignment(assignment: Assignment): Promise<any> {
    let updatedAssignment = {
      name: assignment.name,
      file: assignment.file,
      date: assignment.date,
      incidents: assignment.incidents,
      feedback: assignment.feedback,
      grade: assignment.grade
    }

    let assignmentDoc = this.firestore.doc('assignments/' + assignment.id);

    return assignmentDoc.update(updatedAssignment)
      .then(null, this.handlePromiseError);
  }

  deleteAssignment(studentId, assignment: Assignment) {
    let assignmentDoc = this.firestore.doc('assignments/' + assignment.id);
    let fileStored = this.assignmentsStorage.child('/assignmentsFiles/' + studentId + '/' + assignment.file.id);

    return fileStored.delete()
      .then(
        () => {
          return assignmentDoc.delete()
            .then(null, this.handlePromiseError);
        },
        this.handlePromiseError
      );
  }

  private guidGenerator() {
    var S4 = function() {
      return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };

    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  }

  private handleSnapshots(changes): Assignment[] {
    return changes.map(assignment => {
      let assignmentData = assignment.payload.doc.data() as Assignment;
      
      assignmentData.id = assignment.payload.doc.id;
      assignmentData.data = [];
      assignmentData.placeholder = 'Incidencias';

      if(assignmentData.incidents)
        assignmentData.incidents.forEach(incident => assignmentData.data.push({ tag: incident }));
      else
        assignmentData.incidents = [];

      if(!assignmentData.feedback)
        assignmentData.feedback = '';

      if(!assignmentData.grade)
        assignmentData.grade = 0;

      return assignmentData;
    });
  }

  private handleObservableError(error): Observable<AppError> {
    return Observable.throw(new AppError());
  }

  private handlePromiseError(error): Promise<AppError> {
    return Promise.reject(new AppError());
  }
}