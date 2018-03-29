import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { OfficeComponent } from 'app/components/office/office.component';
import { GroupFilesComponent } from './components/group-files/group-files.component';
import { ContextEditComponent } from './components/context-edit/context-edit.component';
import { ContextWizardComponent } from './components/context-wizard/context-wizard.component';

import { AuthGuard } from './services/auth/auth-guard.service';
import { SessionGuard } from 'app/services/auth/session-guard.service';

export const routes: Routes = [
    { 
        path: '', 
        component: LoginComponent,
        canActivate: [SessionGuard]
    },
    { 
        path: 'context', 
        component: ContextWizardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'groupFiles/:educPlanId/:educPlanName/:courseId/:courseName/:groupId/:groupName',
        component: GroupFilesComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'contextEdit/:educPlanId/:educPlanName/:courseId/:courseName/:groupId/:groupName',
        component: ContextEditComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'office/:educPlanId/:educPlanName/:courseId/:courseName/:groupId/:groupName',
        component: OfficeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: ''
    }
];