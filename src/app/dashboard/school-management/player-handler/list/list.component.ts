import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '../../../../services/toast.service';
import { SchoolManagementService } from '../../school-management.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  kids: any[] = [];
  courseId!: number;

  constructor(
    private schoolService: SchoolManagementService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.courseId = +this.route.snapshot.paramMap.get('courseId')!;
    this.loadKids();
  }

  loadKids(): void {
    this.schoolService.getKids(this.courseId).subscribe(
      (data) => {
        this.kids = data;
      },
      (error) => {
        this.toastService.showError('Error', 'Error al cargar los estudiantes');
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
          this.loadKids();
          this.toastService.showSuccess('Éxito', 'Estudiante eliminado con éxito');
        },
        (error) => {
          this.toastService.showError('Error', 'Error al eliminar al estudiante');
        }
      );
    }
  }
}
