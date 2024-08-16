import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ROLES } from '../shared/constants';
import { RolePipe } from '../role.pipe';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ButtonModule, InputTextModule, FormsModule, CommonModule, RolePipe],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  token: string = '';
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private authService: AuthService,
    private toastService: ToastService, // Inyectar el ToastService
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token')!;
    this.authService.verifySignupToken(this.token).subscribe(
      (userData: { name: string; last_name: string; email: string; }) => {
        this.firstName = userData.name;
        this.lastName = userData.last_name;
        this.email = userData.email;
      },
      (error: any) => {
        console.error('Token verification failed', error);
        this.toastService.showError('Error', 'Token verification failed. Please try again.');
        this.router.navigate(['/login']); // Redirigir si el token no es válido
      }
    );
  }

  onSubmit(): void {
    if (this.password !== this.confirmPassword) {
      this.toastService.showError('Error', 'Passwords do not match');
      return;
    }

    const signupData = {
      token: this.token,
      name: this.firstName,
      last_name: this.lastName,
      rawpassword: this.password,
      email: this.email
    };

    this.authService.signup(signupData).subscribe(
      (response: { access_token: string; }) => {
        // Eliminar el token de acceso del localStorage si existe
        localStorage.removeItem('accessToken');

        // Redirigir al login
        this.router.navigate(['/login']);

        // Mostrar mensaje de éxito
        this.toastService.showSuccess('Success', 'You have successfully signed up! Please log in to continue.');
      },
      (error: any) => {
        console.error('Signup failed', error);
        this.toastService.showError('Error', 'Signup failed. Please try again.');
      }
    );
  }
}
