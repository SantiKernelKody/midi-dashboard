import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '../../../../services/toast.service';
import { SchoolManagementService } from '../../school-management.service';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ButtonModule, InputTextModule, FormsModule, CommonModule],
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
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.courseId = +this.route.snapshot.paramMap.get('courseId')!;
  }

  onSubmit(): void {
    const kidData: any = {
      full_name: this.fullName,
      edad: this.age,
      ethnicity: this.ethnicity,
    };

    // Solo agregar el correo del tutor si no está vacío
    if (this.parentEmail.trim()) {
      kidData.caretaker_email = this.parentEmail;
    }

    this.schoolService.createKid(this.courseId, kidData).subscribe(
      () => {
        this.toastService.showSuccess('Éxito', 'Estudiante creado con éxito');
        this.location.back();
      },
      (error) => {
        this.toastService.showError('Error', 'Error al crear al estudiante');
      }
    );
  }

  goBack(): void {
    this.location.back();
  }
}
