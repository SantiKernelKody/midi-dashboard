import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ButtonModule, InputTextModule, FormsModule, CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  newPassword: string = '';
  confirmPassword: string = '';
  token: string = '';
  isValidToken: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token')!;
    this.authService.verifyResetPasswordToken(this.token).subscribe(
      response => {
        this.isValidToken = true;
      },
      error => {
        this.isValidToken = false;
        this.toastService.showError('Error', 'Token inválido o expirado.');
        this.router.navigate(['/login']);
      }
    );
  }

  onSubmit(): void {
    if (this.newPassword !== this.confirmPassword) {
      this.toastService.showError('Error', 'Las contraseñas no coinciden.');
      return;
    }

    this.authService.resetPassword(this.token, this.newPassword).subscribe(
      response => {
        this.toastService.showSuccess('Éxito', 'Contraseña restablecida con éxito.');
        this.router.navigate(['/login']);
      },
      error => {
        this.toastService.showError('Error', 'No se pudo restablecer la contraseña.');
        console.error('Error al restablecer la contraseña', error);
      }
    );
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
