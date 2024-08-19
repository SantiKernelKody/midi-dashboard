import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list/:courseId', component: ListComponent },
  { path: 'create/:courseId', component: CreateComponent },
  { path: 'update/:kidId', component: UpdateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerHandlerRoutingModule { }
