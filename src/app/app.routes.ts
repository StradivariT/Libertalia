import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CoursesComponent } from './courses/courses.component';

export const routes: Routes = [
    { 
        path: '', 
        component: LoginComponent 
    },
    { 
        path: 'cursos', 
        component: CoursesComponent 
    }
];