import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Student } from './../../common/interfaces/Student';

import { AppError } from './../../common/errors/app-error';

@Injectable()
export class StudentsService {
  private groupDoc: AngularFirestoreDocument<any>;
  private studentsCollection: AngularFirestoreCollection<Student>;

  constructor(private firestore: AngularFirestore) {}

  getStudents(groupId): Observable<any> {
    //Gotta find a way to move this two lines to on init
    this.groupDoc = this.firestore.doc('groups/' + groupId);
    this.studentsCollection = this.firestore.collection('students', ref => ref.where('groupDoc', '==', this.groupDoc.ref).orderBy('number', 'asc'));

    return this.studentsCollection
      .snapshotChanges()
      .map(this.handleSnapshots)
      .catch(this.handleObservableError);
  }

  addStudent(newStudentName, newStudentNum): Promise<any> {
    let newStudent = {
      name: newStudentName,
      number: newStudentNum,
      groupDoc: this.groupDoc.ref
    }

    return this.studentsCollection.add(newStudent)
      .then(null, this.handlePromiseError);
  }

  updateStudent(student): Promise<any> {
    let studentDoc = this.firestore.doc('students/' + student.id);

    return studentDoc.update(student)
      .then(null, this.handlePromiseError);
  }

  private handleSnapshots(changes): Student[] {
    return changes.map(student => {
      const data = student.payload.doc.data() as Student;
      data.id = student.payload.doc.id;
      return data;
    });
  }

  private handleObservableError(error): Observable<AppError> {
    console.log(error);

    return Observable.throw(new AppError());
  }

  private handlePromiseError(error): Promise<AppError> {
    return Promise.reject(new AppError());
  }
}
