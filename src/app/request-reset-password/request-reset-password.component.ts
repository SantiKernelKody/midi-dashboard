import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-reset-password',
  standalone: true,
  imports: [ButtonModule, InputTextModule, FormsModule, CommonModule],
  templateUrl: './request-reset-password.component.html',
  styleUrl: './request-reset-password.component.css'
})
export class RequestResetPasswordComponent {
  email: string = '';

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) { }

  onSubmit(): void {
    this.authService.requestResetPassword(this.email).subscribe(
      response => {
        this.toastService.showSuccess('Éxito', 'Correo de restablecimiento de contraseña enviado.');
      },
      error => {
        this.toastService.showError('Error', 'No se pudo enviar el correo de restablecimiento.');
        console.error('Error al solicitar el restablecimiento de contraseña', error);
      }
    );
  }
  goToLogin(): void {
    this.router.navigate(['/login']);
  }

}
