import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { AuthWrapperComponent } from './components/auth-wrapper/auth-wrapper.component';
import { ContextComponent } from './components/context/context.component';

import { AuthGuard } from './services/auth/auth-guard.service';
import { PreventLoginAccess } from './services/auth/prevent-login-access.service';

export const routes: Routes = [
    { 
        path: '', 
        component: LoginComponent,
        canActivate: [PreventLoginAccess]
    },
    { 
        path: 'context', 
        component: AuthWrapperComponent,
        children: [
            {
                path: '', component: ContextComponent
            }
        ],
        canActivate: [AuthGuard]
    }
];