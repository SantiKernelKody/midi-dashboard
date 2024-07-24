import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchoolPerformanceComponent } from './school-performance/school-performance.component';
import { CoursePerformanceComponent } from './course-performance/course-performance.component';
import { ChildPerformanceComponent } from './child-performance/child-performance.component';

const routes: Routes = [
  {
    path: '',
    component: SchoolPerformanceComponent,
    children: [
      { path: '', redirectTo: 'school', pathMatch: 'full' },
      { path: 'school', component: SchoolPerformanceComponent },
      { path: 'course', component: CoursePerformanceComponent },
      { path: 'child', component: ChildPerformanceComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerformanceRoutingModule { }
