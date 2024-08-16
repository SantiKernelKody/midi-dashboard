import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-request-reset-password',
  standalone: true,
  imports: [],
  templateUrl: './request-reset-password.component.html',
  styleUrl: './request-reset-password.component.css'
})
export class RequestResetPasswordComponent {
  email: string = '';

  constructor(
    private authService: AuthService,
    private toastService: ToastService
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
}
