import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RolePipe } from '../role.pipe';
import { ROLES } from '../shared/constants';
import { AuthService } from '../services/auth.service';
import { DropdownModule } from 'primeng/dropdown';
import { HttpClientModule } from '@angular/common/http';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonModule, InputTextModule, FormsModule, CommonModule, DropdownModule, PasswordModule, RolePipe, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  role!: string;
  email: string = "";
  password: string = "";
  roles = [
    { label: 'Admin', value: ROLES.ADMIN },
    { label: 'Teacher', value: ROLES.TEACHER },
    { label: 'Parent', value: ROLES.PARENT }
  ];
  selectedRole: string = "";
  error: string = "";

  constructor(private authService: AuthService, private router: Router, private toastService: ToastService) { }

  onSubmit(): void {
    this.authService.login(this.email, this.password, this.selectedRole).subscribe(
      () => {
        this.toastService.showSuccess('Login Successful', 'Welcome!');
        this.router.navigate(['/dashboard']);
      },
      err => {
        this.toastService.showError('Login Failed', 'Invalid credentials');
      }
    );
  }
}
