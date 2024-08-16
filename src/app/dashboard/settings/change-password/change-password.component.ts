import { Component } from '@angular/core';
import { ToastService } from '../../../services/toast.service';
import { UserService } from '../../service/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ButtonModule, InputTextModule, FormsModule, CommonModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(private userService: UserService, private toastService: ToastService) { }

  onSubmit(): void {
    if (this.newPassword !== this.confirmPassword) {
      this.toastService.showError('Error', 'New password and confirmation do not match');
      return;
    }

    const data = { old_password: this.oldPassword, new_password: this.newPassword };
    this.userService.changePassword(data).subscribe({
      next: () => {
        this.toastService.showSuccess('Success', 'Password changed successfully');
      },
      error: (error) => {
        this.toastService.showError('Error', error.error.detail || 'Failed to change password');
      }
    });
  }
}
