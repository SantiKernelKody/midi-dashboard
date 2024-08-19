import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '../../../../services/toast.service';
import { SchoolManagementService } from '../../school-management.service';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [ButtonModule, InputTextModule, FormsModule, CommonModule, TooltipModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent {
  fullName: string = '';
  age: number = 0;
  ethnicity: string = '';
  caretakerName: string = '';
  caretakerEmail: string = '';
  originalCaretakerEmail: string = ''; // Almacena el email original del caretaker
  editCaretakerEmail: boolean = false; // Controla si se puede editar el email del caretaker
  playerId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private schoolService: SchoolManagementService,
    private toastService: ToastService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.playerId = +this.route.snapshot.paramMap.get('kidId')!;
    this.loadPlayerData();
  }

  loadPlayerData(): void {
    this.schoolService.getPlayerInfo(this.playerId).subscribe(
      (data) => {
        this.fullName = data.full_name;
        this.age = data.edad;
        this.ethnicity = data.ethnicity;
        this.caretakerName = data.caretaker_name;
        this.caretakerEmail = data.caretaker_email;
        this.originalCaretakerEmail = data.caretaker_email; // Almacena el email original
      },
      (error) => {
        this.toastService.showError('Error', 'Error al cargar los datos del estudiante');
        this.router.navigate(['/dashboard/gestion-escuela/player-handler']);
      }
    );
  }

  toggleCaretakerEmailEdit(): void {
    this.editCaretakerEmail = !this.editCaretakerEmail;
  }

  onSubmit(): void {
    let updatedData: { full_name: string; edad: number; ethnicity: string; caretaker_email?: string } = {
      full_name: this.fullName,
      edad: this.age,
      ethnicity: this.ethnicity,
    };

    if (this.caretakerEmail !== this.originalCaretakerEmail) {
      updatedData.caretaker_email = this.caretakerEmail;
    }

    this.schoolService.editKid(this.playerId, updatedData).subscribe(
      () => {
        this.toastService.showSuccess('Éxito', 'Estudiante actualizado con éxito');
        this.location.back();
      },
      (error) => {
        this.toastService.showError('Error', 'Error al actualizar el estudiante');
      }
    );
  }

  goBack(): void {
    this.location.back();
  }
}
