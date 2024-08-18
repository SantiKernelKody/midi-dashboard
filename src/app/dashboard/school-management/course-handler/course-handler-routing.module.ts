import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTeacherComponent } from './create-teacher/create-teacher.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';

const routes: Routes = [
  { path: '', redirectTo: 'school-list', pathMatch: 'full' },
  { path: 'course-list/:school_id', component: CourseListComponent },
  { path: 'create-course/:school_id', component: CreateCourseComponent },
  { path: 'edit-course/:course_id', component: EditCourseComponent },
  { path: 'create-teacher/:school_id', component: CreateTeacherComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseHandlerRoutingModule { }
