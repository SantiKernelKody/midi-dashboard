import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ROLES } from '../shared/constants';

@Component({
  selector: 'app-login-selection',
  standalone: true,
  imports: [],
  templateUrl: './login-selection.component.html',
  styleUrl: './login-selection.component.css'
})
export class LoginSelectionComponent {
  constructor(private router: Router) { }

  navigateToLogin(role: string): void {
    switch (role) {
      case 'admin':
        this.router.navigate(['login', ROLES.ADMIN]);
        break;
      case 'teacher':
        this.router.navigate(['login', ROLES.TEACHER]);
        break;
      case 'parent':
        this.router.navigate(['login', ROLES.PARENT]);
        break;
      default:
        return;
    }
  }
}
