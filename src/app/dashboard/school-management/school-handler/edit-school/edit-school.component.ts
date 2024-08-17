import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../../services/toast.service';
import { SchoolManagementService } from '../../school-management.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-edit-school',
  standalone: true,
  imports: [ButtonModule, InputTextModule, FormsModule, CommonModule],
  templateUrl: './edit-school.component.html',
  styleUrl: './edit-school.component.css'
})
export class EditSchoolComponent {
  schoolId!: number;
  name: string = '';
  code: string = '';
  description: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private schoolService: SchoolManagementService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.schoolId = +this.route.snapshot.paramMap.get('school_id')!;

    this.schoolService.getSchool(this.schoolId).subscribe(
      (data) => {
        this.name = data.name;
        this.code = data.code;
        this.description = data.description;
      },
      (error) => {
        this.toastService.showError('Error', 'No se pudo cargar la información de la escuela.');
        this.router.navigate(['/dashboard/school-handler/school-list']);
      }
    );
  }

  onSubmit(): void {
    const schoolData = {
      name: this.name,
      code: this.code,
      description: this.description
    };

    this.schoolService.editSchool(this.schoolId, schoolData).subscribe(
      () => {
        this.toastService.showSuccess('Éxito', 'La escuela se ha actualizado correctamente.');
        this.router.navigate(['/dashboard/gestion-escuela/school-handler/list']);
      },
      (error) => {
        this.toastService.showError('Error', 'No se pudo actualizar la escuela.');
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/dashboard/gestion-escuela/school-handler/list']);
  }
}
