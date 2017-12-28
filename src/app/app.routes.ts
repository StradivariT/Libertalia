import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthWrapperComponent } from './auth-wrapper/auth-wrapper.component';
import { SelectionComponent } from './selection/selection.component';

export const routes: Routes = [
    { 
        path: '', 
        component: LoginComponent 
    },
    { 
        path: 'selection', 
        component: AuthWrapperComponent,
        children: [
            {
                path: '', component: SelectionComponent
            }
        ]
    }
];