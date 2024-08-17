import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../../../../services/toast.service';
import { SchoolManagementService } from '../../school-management.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-create-school',
  standalone: true,
  imports: [ButtonModule, InputTextModule, FormsModule, CommonModule],
  templateUrl: './create-school.component.html',
  styleUrl: './create-school.component.css'
})
export class CreateSchoolComponent {
  name: string = '';
  code: string = '';
  description: string = '';

  constructor(
    private schoolService: SchoolManagementService,
    private router: Router,
    private toastService: ToastService
  ) { }

  onSubmit(): void {
    const schoolData = {
      name: this.name,
      code: this.code,
      description: this.description
    };

    this.schoolService.createSchool(schoolData).subscribe(
      () => {
        this.toastService.showSuccess('Éxito', 'La escuela se ha creado correctamente.');
        this.router.navigate(['/dashboard/gestion-escuela/school-handler/list']);
      },
      (error) => {
        this.toastService.showError('Error', 'No se pudo crear la escuela.');
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/dashboard/gestion-escuela/school-handler/list']);
  }
}
