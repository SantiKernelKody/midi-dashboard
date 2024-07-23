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
      { path: 'escuela', loadChildren: () => import('./escuela/escuela.module').then(m => m.EscuelaModule) },
      { path: 'juegos', component: JuegosComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
