import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '../../../../services/toast.service';
import { SchoolManagementService } from '../../school-management.service';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ButtonModule, InputTextModule, FormsModule, CommonModule, TableModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  kids: any[] = [];
  totalItems: number = 0;
  pageSize: number = 10;
  first: number = 0;
  loading: boolean = true;
  courseId: number = 0;

  constructor(
    private schoolService: SchoolManagementService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.courseId = +this.route.snapshot.paramMap.get('courseId')!;
    this.loadKids({ first: this.first, rows: this.pageSize });
  }

  loadKidsLazy(event: any): void {
    this.first = event.first;
    this.pageSize = event.rows;
    this.loadKids(event);
  }

  loadKids(event: any): void {
    this.loading = true;
    const page = event.first / event.rows + 1;

    this.schoolService.getKids(this.courseId, page, event.rows).subscribe(
      (data) => {
        this.kids = data.kids;
        this.totalItems = data.total_items;
        this.loading = false;
      },
      (error) => {
        this.toastService.showError('Error', 'Error al cargar los estudiantes');
        this.loading = false;
      }
    );
  }

  createKid(): void {
    this.router.navigate([`/dashboard/gestion-escuela/player-handler/create`, this.courseId]);
  }

  editKid(kidId: number): void {
    this.router.navigate([`/dashboard/gestion-escuela/player-handler/update`, kidId]);
  }

  deleteKid(kidId: number): void {
    if (confirm('¿Está seguro de que desea eliminar a este estudiante?')) {
      this.schoolService.deleteKid(kidId).subscribe(
        () => {
          this.loadKids(this.courseId);
          this.toastService.showSuccess('Éxito', 'Estudiante eliminado con éxito');
        },
        (error) => {
          this.toastService.showError('Error', 'Error al eliminar al estudiante');
        }
      );
    }
  }
  goBack(): void {
    this.location.back();
  }
  goToPlayerPerformance(playerId: number): void {
    this.router.navigate(['/dashboard/rendimiento/jugador', playerId]);
  }
}
