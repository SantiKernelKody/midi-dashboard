import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LoginGuard } from './guard/login.guard';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
    //create route /. which will show the Login-SelectionComponent
    {
        path: '',
        component: LoginComponent,
        canActivate: [LoginGuard]
    },
    {
        path: 'signup/:token',
        component: SignupComponent
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard]
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
