import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SchoolManagementService } from '../../school-management.service';
import { ConfirmationService } from '../../../../services/confirmation.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastService } from '../../../../services/toast.service';

@Component({
  selector: 'app-school-list',
  standalone: true,
  imports: [ButtonModule, InputTextModule, FormsModule, CommonModule, TableModule],
  templateUrl: './school-list.component.html',
  styleUrl: './school-list.component.css'
})
export class SchoolListComponent {
  schools: any[] = [];

  constructor(
    private schoolService: SchoolManagementService,
    private router: Router,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.loadSchools();
  }

  loadSchools(): void {
    this.schoolService.getSchools(1, 10).subscribe(
      (data) => {
        this.schools = data;
      },
      (error) => {
        this.toastService.showError('Error', 'No se pudo cargar la lista de escuelas.');
      }
    );
  }

  createSchool(): void {
    this.router.navigate(['/dashboard/gestion-escuela/school-handler/create']);
  }

  editSchool(schoolId: number): void {
    this.router.navigate([`/dashboard/gestion-escuela/school-handler/edit/${schoolId}`]);
  }

  deleteSchool(schoolId: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta escuela?')) {
      this.schoolService.deleteSchool(schoolId).subscribe(
        () => {
          this.toastService.showSuccess('Éxito', 'La escuela ha sido eliminada correctamente.');
          this.loadSchools(); // Recargar la lista de escuelas
        },
        (error) => {
          this.toastService.showError('Error', 'No se pudo eliminar la escuela.');
        }
      );
    }
  }
  goToCourses(schoolId: number): void {
    this.router.navigate(['/dashboard/gestion-escuela/course-handler']);
  }
}
