import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../services/toast.service';
import { SkillManagementService } from '../../service/skill-management.service';
import { CommonModule, Location } from '@angular/common';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-update-level',
  standalone: true,
  imports: [MultiSelectModule, CommonModule, ButtonModule, ReactiveFormsModule],
  templateUrl: './update-level.component.html',
  styleUrl: './update-level.component.css'
})
export class UpdateLevelComponent {
  levelForm: FormGroup;
  levelId: number;
  skills: any[] = [];
  selectedSkills: any[] = [];

  constructor(
    private fb: FormBuilder,
    private levelService: SkillManagementService,
    private skillService: SkillManagementService,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.levelId = +this.route.snapshot.paramMap.get('levelId')!;
    this.levelForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      evaluation_criteria: ['', Validators.required],
      max_score: ['', [Validators.required, Validators.min(1)]],
      skill_ids: [[]]
    });
  }

  ngOnInit(): void {
    this.loadLevelAndSkills();
  }

  loadLevelAndSkills(): void {
    forkJoin([
      this.levelService.getLevelWithSkills(this.levelId),
      this.skillService.getAllSkills()
    ]).subscribe({
      next: ([levelData, skillsData]) => {
        this.levelForm.patchValue({
          name: levelData.name,
          description: levelData.description,
          evaluation_criteria: levelData.evaluation_criteria,
          max_score: levelData.max_score,
          skill_ids: levelData.skill_ids
        });

        this.skills = skillsData.skills;

        // Asegurar que los skills seleccionados se establezcan después de que ambas listas se hayan cargado
        this.selectedSkills = this.skills.filter(skill => levelData.skill_ids.includes(skill.id));
      },
      error: () => {
        this.toastService.showError('Error', 'Failed to load level or skills data');
      }
    });
  }

  onSubmit(): void {
    if (this.levelForm.invalid) {
      return;
    }

    // Extraer solo los IDs de las skills seleccionadas
    const selectedSkillIds = this.selectedSkills.map(skill => skill.id);

    // Crear el objeto para la actualización del nivel
    const updatedLevel = {
      ...this.levelForm.value,
      skill_ids: selectedSkillIds // Asignar solo los IDs de las skills seleccionadas
    };

    // Realizar la solicitud de actualización
    this.levelService.updateLevel(this.levelId, updatedLevel).subscribe({
      next: () => {
        this.toastService.showSuccess('Success', 'Level updated successfully');
        this.location.back();
      },
      error: () => {
        this.toastService.showError('Error', 'Failed to update level');
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}
