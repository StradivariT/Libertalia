import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AuthWrapperComponent } from './auth-wrapper/auth-wrapper.component';
import { SelectionComponent } from './selection/selection.component';

import { AuthGuard } from './services/auth/auth-guard.service';
import { PreventLoginAccess } from './services/auth/prevent-login-access.service';

export const routes: Routes = [
    { 
        path: '', 
        component: LoginComponent,
        canActivate: [PreventLoginAccess]
    },
    { 
        path: 'selection', 
        component: AuthWrapperComponent,
        children: [
            {
                path: '', component: SelectionComponent
            }
        ],
        canActivate: [AuthGuard]
    }
];