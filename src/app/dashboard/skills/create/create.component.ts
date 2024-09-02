import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../../../services/toast.service';
import { SkillManagementService } from '../../service/skill-management.service';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ButtonModule, FormsModule, CommonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  name: string = '';
  description: string = '';

  constructor(
    private skillService: SkillManagementService,
    private router: Router,
    private toastService: ToastService,
    private location: Location
  ) { }

  onSubmit(): void {
    const skillData = {
      name: this.name,
      description: this.description
    };

    this.skillService.createSkill(skillData).subscribe({
      next: () => {
        this.toastService.showSuccess('Éxito', 'Habilidad creada exitosamente');
        this.router.navigate(['/dashboard/skills']);
      },
      error: (error) => {
        this.toastService.showError('Error', error.error.detail || 'No se pudo crear la habilidad');
      }
    });
  }
  goBack(): void {
    this.location.back();
  }
}
