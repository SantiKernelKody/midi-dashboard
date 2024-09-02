import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../services/toast.service';
import { SkillManagementService } from '../../service/skill-management.service';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [ButtonModule, FormsModule, CommonModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent {
  skillId: number;
  name: string = '';
  description: string = '';

  constructor(
    private skillService: SkillManagementService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private location: Location
  ) {
    this.skillId = +this.route.snapshot.paramMap.get('skillId')!;
  }

  ngOnInit(): void {
    this.loadSkillData();
  }

  loadSkillData(): void {
    this.skillService.getSkill(this.skillId).subscribe({
      next: (data) => {
        this.name = data.name;
        this.description = data.description;
      },
      error: () => {
        this.toastService.showError('Error', 'No se pudo cargar la información de la habilidad');
        this.router.navigate(['/dashboard/skills']);
      }
    });
  }

  onSubmit(): void {
    const updatedSkillData = {
      name: this.name,
      description: this.description
    };

    this.skillService.updateSkill(this.skillId, updatedSkillData).subscribe({
      next: () => {
        this.toastService.showSuccess('Éxito', 'Habilidad actualizada exitosamente');
        this.router.navigate(['/dashboard/skills']);
      },
      error: (error) => {
        this.toastService.showError('Error', error.error.detail || 'No se pudo actualizar la habilidad');
      }
    });
  }
  goBack(): void {
    this.location.back();
  }
}
