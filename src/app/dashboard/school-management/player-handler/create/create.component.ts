import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '../../../../services/toast.service';
import { SchoolManagementService } from '../../school-management.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  fullName: string = '';
  age: number | null = null;
  ethnicity: string = '';
  parentEmail: string = '';

  courseId!: number;

  constructor(
    private schoolService: SchoolManagementService,
    private router: Router,
    private toastService: ToastService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.courseId = +this.route.snapshot.paramMap.get('courseId')!;
  }

  onSubmit(): void {
    const kidData = {
      full_name: this.fullName,
      edad: this.age,
      ethnicity: this.ethnicity,
    };

    this.schoolService.createKid(this.courseId, kidData, this.parentEmail).subscribe(
      () => {
        this.toastService.showSuccess('Éxito', 'Estudiante creado con éxito');
        this.router.navigate([`/dashboard/gestion-escuela/player-handler`, this.courseId]);
      },
      (error) => {
        this.toastService.showError('Error', 'Error al crear al estudiante');
      }
    );
  }

  goBack(): void {
    this.router.navigate([`/dashboard/gestion-escuela/player-handler`, this.courseId]);
  }
}
