import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

import { SubContext } from './../../common/interfaces/SubContext';
import { SubContextEndpoint } from './../../common/interfaces/SubContextEndpoint';
import { AppError } from '../../common/errors/app-error';

@Injectable()
export class ContextService {
  private subContextCollection: AngularFirestoreCollection<SubContext>
  private subContextEndpoints: SubContextEndpoint[] = [
    {
      docRef: '',
      path: 'educPlans'
    },
    {
      docRef: 'educPlans',
      path: 'courses'
    },
    {
      docRef: 'courses',
      path: 'groups',
    }
  ];

  constructor(private firestore: AngularFirestore) {}

  getMainContexts(): Observable<any> {
    return this.firestore.collection('contexts', ref => ref.orderBy('order'))
      .valueChanges()
      .catch(this.handleObservableError);
  }

  getSubcontexts(mainContext, subContext): Observable<any> {
    let currentSubcontext = this.subContextEndpoints[mainContext];

    if(mainContext == 0) {
      this.subContextCollection = this.firestore.collection(currentSubcontext.path);
    } else {
      if(!subContext[mainContext - 1])
        return Observable.of(null);

      let mainContextRef = this.firestore.doc(currentSubcontext.docRef + '/' + subContext[mainContext - 1].id).ref;
      this.subContextCollection = this.firestore.collection(currentSubcontext.path, ref => ref.where(currentSubcontext.docRef + 'Doc', '==', mainContextRef));
    }

    return this.subContextCollection
      .snapshotChanges()
      .map(this.handleSnapshots)
      .catch(this.handleObservableError);
  }

  addSubcontext(mainContext, name, subContext): Promise<any> {
    let currentSubcontext = this.subContextEndpoints[mainContext];
    let newSubContext = {
      name: name
    }

    this.subContextCollection = this.firestore.collection(currentSubcontext.path);

    if(mainContext != 0) {
      let mainContextRef = this.firestore.doc(currentSubcontext.docRef + '/' + subContext[mainContext - 1].id).ref;
      newSubContext[currentSubcontext.docRef + 'Doc'] = mainContextRef;
    }

    return this.subContextCollection.add(newSubContext)
      .then(null, this.handlePromiseError);
  }

  private handleSnapshots(changes): SubContext[] {
    return changes.map(subContext => {
      const data = subContext.payload.doc.data() as SubContext;
      data.id = subContext.payload.doc.id;
      return data;
    });
  }

  private handleObservableError(error): Observable<AppError> {
    return Observable.throw(AppError);
  }

  private handlePromiseError(error): Promise<AppError> {
    return Promise.reject(new AppError());
  }
}