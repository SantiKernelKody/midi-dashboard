import { Component } from '@angular/core';
import { SchoolManagementService } from '../../school-management.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../../services/toast.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-create-teacher',
  standalone: true,
  imports: [ButtonModule, InputTextModule, FormsModule, CommonModule, TableModule],
  templateUrl: './create-teacher.component.html',
  styleUrl: './create-teacher.component.css'
})
export class CreateTeacherComponent {
  name: string = '';
  lastName: string = '';
  email: string = '';
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
    const teacherData = {
      name: this.name,
      last_name: this.lastName,
      email: this.email,
    };

    this.schoolService.createTeacher(this.schoolId, teacherData).subscribe(
      () => {
        this.toastService.showSuccess('Éxito', 'Profesor creado con éxito');
        this.router.navigate(['/dashboard/gestion-escuela/course-handler/course-list', this.schoolId]);
      },
      (error) => {
        this.toastService.showError('Error', 'Error al crear el profesor');
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/dashboard/gestion-escuela/course-handler/course-list', this.schoolId]);
  }
}
