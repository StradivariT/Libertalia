import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { ContextComponent } from './../../context/context.component';
import { Context } from '../../context/context-list/context-list.component';
import { contexts } from '../../context/context.component'

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

import { AppError } from '../../common/errors/app-error';

@Injectable()
export class ContextService {
  constructor(private firestore: AngularFirestore) { }

  getContext(): Observable<Context[]> {
    return this.firestore.collection(contexts[ContextComponent.contextType])
      .valueChanges()
      .catch(this.handleError);
  }

  private handleError(error) {
    return Observable.throw(new AppError());
  }
}