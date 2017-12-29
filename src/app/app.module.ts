import { AppErrorHandler } from './common/errors/app-error-handler';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterializeModule } from 'angular2-materialize';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database'

import { environment } from './../environments/environment';
import { routes } from './app.routes';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainTabsComponent } from './main-tabs/main-tabs.component';
import { NavbarComponent } from './auth-wrapper/navbar/navbar.component';
import { AuthWrapperComponent } from './auth-wrapper/auth-wrapper.component';
import { SelectionComponent } from './selection/selection.component';
import { SelectionCollectionComponent } from './selection/selection-collection/selection-collection.component';

import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from './services/auth/auth-guard.service';
import { PreventLoginAccess } from './services/auth/prevent-login-access.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainTabsComponent,
    NavbarComponent,
    AuthWrapperComponent,
    SelectionComponent,
    SelectionCollectionComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterializeModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'Libertalia'),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    RouterModule,
    RouterModule.forRoot(routes),
    Ng4LoadingSpinnerModule.forRoot()
  ],
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandler },
    AuthService,
    AuthGuard,
    PreventLoginAccess
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
