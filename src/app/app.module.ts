import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterializeModule } from 'angular2-materialize';
import { RouterModule } from '@angular/router';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { environment } from './../environments/environment';
import { routes } from './app.routes';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/auth-wrapper/navbar/navbar.component';
import { AuthWrapperComponent } from './components/auth-wrapper/auth-wrapper.component';
import { ContextComponent } from './components/context/context.component';
import { OfficeComponent } from './components/office/office.component';
import { StudentsComponent } from './components/office/students/students.component';
import { AssignmentsComponent } from './components/office/students/assignments/assignments.component';

import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from './services/auth/auth-guard.service';
import { PreventLoginAccess } from './services/auth/prevent-login-access.service';
import { ContextService } from './services/context/context.service';
import { StudentsService } from './services/students/students.service';
import { AssignmentsService } from './services/assignments/assignments.service';

import { AppErrorHandler } from './common/errors/app-error-handler';
import { FilterPipe } from './common/pipes/filter-pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    AuthWrapperComponent,
    ContextComponent,
    FilterPipe,
    OfficeComponent,
    StudentsComponent,
    AssignmentsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterializeModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'Libertalia'),
    AngularFireAuthModule,
    AngularFirestoreModule,
    RouterModule,
    RouterModule.forRoot(routes),
    Ng4LoadingSpinnerModule.forRoot()
  ],
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandler },
    AuthService,
    AuthGuard,
    PreventLoginAccess,
    ContextService,
    StudentsService,
    AssignmentsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
