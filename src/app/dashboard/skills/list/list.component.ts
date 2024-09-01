import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../../../services/toast.service';
import { SkillManagementService } from '../../service/skill-management.service';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [TableModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  skills: any[] = [];
  totalItems: number = 0;
  pageSize: number = 10;
  page: number = 1;

  constructor(
    private skillService: SkillManagementService,
    private router: Router,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.loadSkills();
  }

  loadSkills(): void {
    this.skillService.getSkills(this.page, this.pageSize).subscribe(
      (data) => {
        this.skills = data.skills;
        this.totalItems = data.total_items;
      },
      (error) => {
        this.toastService.showError('Error', 'No se pudo cargar la lista de habilidades.');
      }
    );
  }

  loadAllSkills(): void {
    this.skillService.getAllSkills().subscribe(
      (data) => {
        this.skills = data.skills;
        this.totalItems = this.skills.length; // Actualiza el total de items
      },
      (error) => {
        this.toastService.showError('Error', 'No se pudo cargar la lista completa de habilidades.');
      }
    );
  }

  createSkill(): void {
    this.router.navigate(['/dashboard/skills/create']);
  }

  editSkill(skillId: number): void {
    this.router.navigate([`/dashboard/skills/update/${skillId}`]);
  }

  deleteSkill(skillId: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta habilidad?')) {
      this.skillService.deleteSkill(skillId).subscribe(
        () => {
          this.toastService.showSuccess('Éxito', 'La habilidad ha sido eliminada correctamente.');
          this.loadSkills(); // Recargar la lista de habilidades
        },
        (error) => {
          this.toastService.showError('Error', 'No se pudo eliminar la habilidad.');
        }
      );
    }
  }

  onPageChange(event: any): void {
    this.page = event.page + 1;
    this.loadSkills();
  }
}
