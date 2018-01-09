import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Assignment } from './../../common/interfaces/Assignment';

import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';

import { AppError } from '../../common/errors/app-error';

@Injectable()
export class AssignmentsService {
  private studentDoc: AngularFirestoreDocument<any>;
  private assignmentsCollection: AngularFirestoreCollection<Assignment>;

  constructor(private firestore: AngularFirestore) {}

  getAssignments(studentId): Observable<any> {
    this.studentDoc = this.firestore.doc('students/' + studentId);
    this.assignmentsCollection = this.firestore.collection('assignments', ref => ref.where('studentDoc', '==', this.studentDoc.ref));

    return this.assignmentsCollection
      .snapshotChanges()
      .map(this.handleSnapshots)
      .catch(this.handleObservableError);
  }

  private handleSnapshots(changes): Assignment[] {
    return changes.map(assignment => {
      let data = assignment.payload.doc.data() as Assignment; 
      data.data = [];

      data.incidents.forEach(incident => {
        data.data.push({
          tag: incident
        })
      });

      data.id = assignment.payload.doc.id;
      return data;
    });
  }

  private handleObservableError(error): Observable<AppError> {
    return Observable.throw(new AppError());
  }

  private handlePromiseError(error): Promise<AppError> {
    return Promise.reject(new AppError());
  }
}