import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { ToastService } from '../../../services/toast.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [ButtonModule, InputTextModule, FormsModule, CommonModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent {
  name: string = '';
  last_name: string = '';
  email: string = '';

  constructor(private userService: UserService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.loadUserInfo();
  }

  loadUserInfo(): void {
    this.userService.getUserInfo().subscribe({
      next: (data) => {
        this.name = data.name;
        this.last_name = data.last_name;
        this.email = data.email;
      },
      error: (error) => {
        this.toastService.showError('Error', 'No se pudo cargar la información del usuario.');
      }
    });
  }

  onSubmit(): void {
    const data = { name: this.name, last_name: this.last_name, email: this.email };
    this.userService.updateUser(data).subscribe({
      next: () => {
        this.toastService.showSuccess('Éxito', 'Datos del usuario actualizados correctamente.');
      },
      error: (error) => {
        this.toastService.showError('Error', error.error.detail || 'No se pudieron actualizar los datos del usuario.');
      }
    });
  }
}
