import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '../../../../services/toast.service';
import { SchoolManagementService } from '../../school-management.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-create-course',
  standalone: true,
  imports: [ButtonModule, InputTextModule, FormsModule, CommonModule],
  templateUrl: './create-course.component.html',
  styleUrl: './create-course.component.css'
})
export class CreateCourseComponent {
  subjectName: string = '';
  description: string = '';
  schoolId: number = 0;

  constructor(
    private schoolService: SchoolManagementService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    // Obtener el school_id desde la ruta
    this.schoolId = +this.route.snapshot.paramMap.get('school_id')!;
  }

  onSubmit(): void {
    const courseData = {
      subject_name: this.subjectName,
      description: this.description
    };

    this.schoolService.createCourse(this.schoolId, courseData).subscribe(
      () => {
        this.toastService.showSuccess('Éxito', 'Curso creado con éxito');
        this.router.navigate(['/dashboard/gestion-escuela/course-handler/course-list', this.schoolId]);
      },
      (error) => {
        this.toastService.showError('Error', 'Error al crear el curso');
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/dashboard/gestion-escuela/course-handler/course-list', this.schoolId]);
  }
}
