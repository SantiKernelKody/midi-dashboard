import { Component } from '@angular/core';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { ParentHeaderComponent } from './components/parent-header/parent-header.component';
import { TeacherHeaderComponent } from './components/teacher-header/teacher-header.component';

@Component({
  selector: 'app-general',
  standalone: true,
  imports: [AdminHeaderComponent, ParentHeaderComponent, TeacherHeaderComponent],
  templateUrl: './general.component.html',
  styleUrl: './general.component.css'
})
export class GeneralComponent {

}
