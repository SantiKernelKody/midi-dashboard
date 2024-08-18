import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '../../../../services/toast.service';
import { SchoolManagementService } from '../../school-management.service';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent {
  fullName: string = '';
  age: number | null = null;
  ethnicity: string = '';

  kidId!: number;

  constructor(
    private schoolService: SchoolManagementService,
    private router: Router,
    private toastService: ToastService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.kidId = +this.route.snapshot.paramMap.get('kidId')!;
    this.loadKidData();
  }

  loadKidData(): void {
    this.schoolService.getPlayerInfo(this.kidId).subscribe(
      (data) => {
        this.fullName = data.full_name;
        this.age = data.edad;
        this.ethnicity = data.ethnicity;
      },
      (error) => {
        this.toastService.showError('Error', 'Error al cargar la información del estudiante');
      }
    );
  }

  onSubmit(): void {
    const kidData = {
      full_name: this.fullName,
      edad: this.age,
      ethnicity: this.ethnicity,
    };

    this.schoolService.editKid(this.kidId, kidData).subscribe(
      () => {
        this.toastService.showSuccess('Éxito', 'Información del estudiante actualizada con éxito');
        this.router.navigate([`/dashboard/gestion-escuela/player-handler`, this.kidId]);
      },
      (error) => {
        this.toastService.showError('Error', 'Error al actualizar la información del estudiante');
      }
    );
  }

  goBack(): void {
    this.router.navigate([`/dashboard/gestion-escuela/player-handler`, this.kidId]);
  }
}
