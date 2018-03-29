import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routes } from './app.routes';

import { ToastyModule } from 'ng2-toasty';
import { ClarityModule } from "@clr/angular";

import { AuthService } from './services/auth/auth.service';
import { HttpService } from './services/http/http.service';
import { GroupService } from './services/group/group.service';
import { AuthGuard } from './services/auth/auth-guard.service';
import { CourseService } from './services/course/course.service';
import { ContextService } from './services/context/context.service';
import { SessionGuard } from './services/auth/session-guard.service';
import { StudentsService } from './services/students/students.service';
import { EducPlanService } from './services/educ-plan/educ-plan.service';
import { ActivitiesService } from './services/activities/activities.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { OfficeComponent } from './components/office/office.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { StudentsComponent } from './components/office/students/students.component';
import { GroupFilesComponent } from './components/group-files/group-files.component';
import { ContextEditComponent } from './components/context-edit/context-edit.component';
import { ActivitiesComponent } from './components/office/activities/activities.component';
import { ContextWizardComponent } from './components/context-wizard/context-wizard.component';
import { GroupFilesCardComponent } from './components/group-files/group-files-card/group-files-card.component';
import { ActivitiesHeaderComponent } from './components/office/activities/activities-header/activities-header.component';
import { ContextWizardStepComponent } from './components/context-wizard/context-wizard-step/context-wizard-step.component';
import { ActivitiesDescriptionComponent } from './components/office/activities/activities-description/activities-description.component';

import { OrderPipe } from './common/pipes/order-by.pipe';

import { AppErrorHandler } from './common/errors/app-error-handler';


@NgModule({
  declarations: [
    OrderPipe,
    AppComponent,
    LoginComponent,
    OfficeComponent,    
    NavbarComponent,
    SpinnerComponent,
    StudentsComponent,
    ActivitiesComponent,
    GroupFilesComponent,
    ContextEditComponent,
    ContextWizardComponent,
    GroupFilesCardComponent,
    ActivitiesHeaderComponent,
    ContextWizardStepComponent,
    ActivitiesDescriptionComponent,
  ],
  imports: [
    HttpModule,
    FormsModule,    
    RouterModule,
    BrowserModule,
    ClarityModule,
    ToastyModule.forRoot(),
    BrowserAnimationsModule,    
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthGuard,
    HttpService,
    AuthService,
    GroupService,
    SessionGuard,
    CourseService,
    ContextService,
    EducPlanService,
    StudentsService,
    ActivitiesService,
    { provide: ErrorHandler, useClass: AppErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }