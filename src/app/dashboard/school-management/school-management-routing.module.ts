import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'school-handler',
    loadChildren: () => import('./school-handler/school-handler.module').then(m => m.SchoolHandlerModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolManagementRoutingModule { }
