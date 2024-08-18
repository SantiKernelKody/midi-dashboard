import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '../../../../services/toast.service';
import { SchoolManagementService } from '../../school-management.service';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-edit-course',
  standalone: true,
  imports: [ButtonModule, InputTextModule, FormsModule, CommonModule],
  templateUrl: './edit-course.component.html',
  styleUrl: './edit-course.component.css'
})
export class EditCourseComponent {
  subjectName: string = '';
  description: string = '';
  courseId: number = 0;

  constructor(
    private schoolService: SchoolManagementService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    // Obtener el course_id desde la ruta
    this.courseId = +this.route.snapshot.paramMap.get('course_id')!;
    this.loadCourseData();
  }

  loadCourseData(): void {
    this.schoolService.getCourse(this.courseId).subscribe(
      (data) => {
        this.subjectName = data.subject_name;
        this.description = data.description;
      },
      (error) => {
        this.toastService.showError('Error', 'Error al cargar los datos del curso');
      }
    );
  }

  onSubmit(): void {
    const courseData = {
      subject_name: this.subjectName,
      description: this.description
    };

    this.schoolService.editCourse(this.courseId, courseData).subscribe(
      () => {
        this.toastService.showSuccess('Éxito', 'Curso editado con éxito');
        this.router.navigate(['/dashboard/gestion-escuela/course-handler']);
      },
      (error) => {
        this.toastService.showError('Error', 'Error al editar el curso');
      }
    );
  }

  goBack(): void {
    this.location.back();
  }
}
