import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent {
  name: string = '';
  last_name: string = '';
  email: string = '';

  constructor(private userService: UserService, private toastService: ToastService) { }

  ngOnInit(): void {
    // Aquí puedes obtener los datos actuales del usuario si es necesario
  }

  onSubmit(): void {
    const data = { name: this.name, last_name: this.last_name, email: this.email };
    this.userService.updateUser(data).subscribe({
      next: () => {
        this.toastService.showSuccess('Success', 'User data updated successfully');
      },
      error: (error) => {
        this.toastService.showError('Error', error.error.detail || 'Failed to update user data');
      }
    });
  }
}
