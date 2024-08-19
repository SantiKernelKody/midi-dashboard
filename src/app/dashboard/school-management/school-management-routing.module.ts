import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'school-handler',
    loadChildren: () => import('./school-handler/school-handler.module').then(m => m.SchoolHandlerModule)
  },
  {
    path: 'course-handler',
    loadChildren: () => import('./course-handler/course-handler.module').then(m => m.CourseHandlerModule)
  },
  {
    path: 'player-handler',
    loadChildren: () => import('./player-handler/player-handler.module').then(m => m.PlayerHandlerModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolManagementRoutingModule { }
