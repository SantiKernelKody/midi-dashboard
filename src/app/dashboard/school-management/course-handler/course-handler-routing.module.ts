import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSchoolComponent } from './create-school/create-school.component';
import { CreateTeacherComponent } from './create-teacher/create-teacher.component';
import { EditSchoolComponent } from './edit-school/edit-school.component';
import { CourseListComponent } from './course-list/course-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'school-list', pathMatch: 'full' },
  { path: 'course-list', component: CourseListComponent },
  { path: 'create-school', component: CreateSchoolComponent },
  { path: 'edit-school/:id', component: EditSchoolComponent },
  { path: 'create-teacher', component: CreateTeacherComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseHandlerRoutingModule { }
