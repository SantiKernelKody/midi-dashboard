import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
  { path: '', redirectTo: 'update-user', pathMatch: 'full' },
  { path: 'update-user', component: UpdateUserComponent },
  { path: 'change-password', component: ChangePasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
