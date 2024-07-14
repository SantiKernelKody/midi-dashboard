import { Routes } from '@angular/router';
import { LoginSelectionComponent } from './login-selection/login-selection.component';

export const routes: Routes = [
    //create route /. which will show the Login-SelectionComponent
    {
        path: '',
        component: LoginSelectionComponent
    }

];
