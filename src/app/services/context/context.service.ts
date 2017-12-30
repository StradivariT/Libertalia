import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/observable/throw';

import { AppError } from '../../common/errors/app-error';

@Injectable()
export class ContextService {
  constructor(private firestore: AngularFirestore) { }

  getMainContexts(): Observable<any> {
    return this.firestore
      .collection('contexts', ref => ref.orderBy('order'))
      .valueChanges()
      .catch(this.handleError);
  }

  getEducPlans(): Observable<any> {
    return this.firestore
      .collection('educPlans', ref => ref.orderBy('name', 'desc'))
      .snapshotChanges()
      .map(educPlansActions => {
        return educPlansActions.map(educPlan => {
          const id = educPlan.payload.doc.id;
          const data = educPlan.payload.doc.data();

          return { id, data };
        });
      })
      .catch(this.handleError);
  }

  private handleError(error): Observable<AppError> {
    return Observable.throw(new AppError());
  }
}