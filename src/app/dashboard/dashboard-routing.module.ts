import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GeneralComponent } from './general/general.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'general', pathMatch: 'full' },
      { path: 'general', component: GeneralComponent },
      { path: 'rendimiento', loadChildren: () => import('./performance/performance.module').then(m => m.PerformanceModule) },
      { path: 'juegos', loadChildren: () => import('./games/games.module').then(m => m.GamesModule) },
      { path: 'gestion-escuela', loadChildren: () => import('./school-management/school-management.module').then(m => m.SchoolManagementModule) },
      { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
