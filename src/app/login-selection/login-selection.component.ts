import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
    this.router.navigate(['login', role]);
  }
}
