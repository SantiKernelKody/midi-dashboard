import { Routes } from '@angular/router';
import { LoginSelectionComponent } from './login-selection/login-selection.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
    //create route /. which will show the Login-SelectionComponent
    {
        path: '',
        component: LoginSelectionComponent
    },
    {
        path: 'login/:role',
        component: LoginComponent
    },
    {
        path: 'signup/:role',
        component: SignupComponent
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    {
        path: '', redirectTo: '',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: ''
    }

];
