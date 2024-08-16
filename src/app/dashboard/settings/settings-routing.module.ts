import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SettingsPanelComponent } from './settings-panel/settings-panel.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsPanelComponent,
    children: [
      { path: 'update-user', component: UpdateUserComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: '', redirectTo: 'update-user', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
