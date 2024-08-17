import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSchoolComponent } from './create-school/create-school.component';
import { SchoolListComponent } from './school-list/school-list.component';
import { EditSchoolComponent } from './edit-school/edit-school.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: SchoolListComponent },
  { path: 'create', component: CreateSchoolComponent },
  { path: 'edit/:school_id', component: EditSchoolComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolHandlerRoutingModule { }
